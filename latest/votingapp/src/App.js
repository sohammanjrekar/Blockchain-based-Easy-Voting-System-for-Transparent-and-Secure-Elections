import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/Login';
import Results from './Components/Results';
import Admin from './Components/Admin';
import VotingPage from './Components/VotingPage';
import { contractAbi, contractAddress } from './Constant/constant';
import Navbar from './Components/Navbar';
import Aboutus from './Components/Aboutus';
import Contactus from './Components/Contactus';
import Footer from './Components/Footer';
const ethers = require('ethers');

function App() {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [canVoteState, setCanVoteState] = useState(true);
  const [candidateName, setCandidateName] = useState('');
  const [candidateIdno, setCandidateIdno] = useState('');
  const [candidatePincode, setCandidatePincode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasVoted, setHasVoted] = useState(false); // New state variable to check if the user has voted

  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    connectToMetamask();
    checkIfVoted(); // Call the function to check if the user has voted

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  async function removeCandidate(index) {
    if (index >= 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(contractAddress, contractAbi, signer);

      try {
        // Call the removeCandidate function on your contract with the candidate index
        await votingContract.removeCandidate(index);
        // You may want to add additional logic or handling after the candidate is successfully removed
        getCandidates(); // Refresh the list of candidates after removal
      } catch (error) {
        console.error('Error removing candidate: ', error);
        // You can handle errors or display error messages to the user here
      }
    } else {
      console.error('Invalid candidate index');
      // Handle the case where the user attempts to remove a candidate with an invalid index
    }
  }

  async function checkIfVoted() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(contractAddress, contractAbi, signer);

      try {
        // Call the contract function to check if the current user has voted
        const hasVoted = await votingContract.voters(account);
        setHasVoted(hasVoted);
      } catch (error) {
        console.error('Error checking if you have voted:', error);
        // Handle the error as needed
      }
    }
  }
  async function canVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(contractAddress, contractAbi, signer);
    const voteStatus = await votingContract.voters(await signer.getAddress());
    setCanVoteState(!voteStatus);
  }
  async function getCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(contractAddress, contractAbi, signer);
  
    try {
      const candidatesCount = await votingContract.getCandidatesCount();
      const candidatesList = [];
      for (let i = 0; i < candidatesCount; i++) {
        const candidate = await votingContract.getCandidate(i);
        const voteCount = candidate.voteCount.toNumber(); // Get the vote count
        candidatesList.push({
          name: candidate.name,
          idno: candidate.idno,
          pincode: candidate.pincode.toNumber(),
          voteCount, // Add the vote count to the candidate object
        });
      }
      setCandidates(candidatesList);
    } catch (error) {
      console.error('Error fetching candidates: ', error);
    }
  }
  
  
  
  
  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(contractAddress, contractAbi, signer);
    const status = await votingContract.getVotingStatus();
    setVotingStatus(status);
  }

  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(contractAddress, contractAbi, signer);
    const time = await votingContract.getRemainingTime();
    setRemainingTime(parseInt(time, 10));
  }

  async function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        // Check if the connected address is the owner's address in the Voting contract
        const votingContract = new ethers.Contract(contractAddress, contractAbi, signer);
        const ownerAddress = await votingContract.owner();
        
        setAccount(address);
        setIsConnected(true);
        setIsAdmin(ownerAddress === address); // Check if the address matches the owner's address
        canVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error('Metamask is not detected in the browser');
    }
  }
  const vote = async (candidateIndex) => {
    if (candidateIndex >= 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(contractAddress, contractAbi, signer);
  
      try {
        // Call the vote function on your contract with the candidateIndex
        await votingContract.vote(candidateIndex);
        console.log("Vote successful");
      } catch (error) {
        console.error('Error casting vote: ', error);
        // You can handle errors or display error messages to the user here
      }
    } else {
      console.error('Invalid candidate selection');
      // Handle the case where the user attempts to vote without selecting a candidate
    }
  };
  

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  async function addCandidate() {
    if (!candidateName || !candidateIdno || !candidatePincode) {
      console.error('Name, ID No, and Pincode are required');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(contractAddress, contractAbi, signer);

    try {
      await votingContract.addCandidate(candidateName, candidateIdno, candidatePincode);
      getCandidates();
      setCandidateName('');
      setCandidateIdno('');
      setCandidatePincode('');
    } catch (error) {
      console.error('Error adding candidate: ', error);
    }
  }

  return (
    <div className="App">
      
      <Router>
      <Navbar/>
        <Routes>
        <Route path="/results" element={
            candidates.length > 0 ? (
              <Results candidates={candidates} />
            ) : (
              <p>Loading candidates...</p>
            )
          } />
          <Route
            path="/admin"
            element={
              <Admin
                candidates={candidates}
                addCandidate={addCandidate}
                removeCandidate={removeCandidate} // Pass the removeCandidate function
                candidateName={candidateName}
                setCandidateName={setCandidateName}
                candidateIdno={candidateIdno}
                setCandidateIdno={setCandidateIdno}
                candidatePincode={candidatePincode}
                setCandidatePincode={setCandidatePincode}
              />
            }
          />
          <Route path="/voting" element={<VotingPage candidates={candidates} vote={vote} hasVoted={hasVoted} />} />
        
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/contact" element={<Contactus />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
