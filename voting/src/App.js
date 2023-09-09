import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Web3 from "web3"; // Import the Web3 library
import Header from "./components/Header";
import Home from "./pages/Home";
import AuthorityPage from "./pages/Authority";
import RegisterVoter from "./components/RegisterVoter";
import RegisterCandidate from "./components/RegisterCandidate";
import Vote from "./components/Vote";
const YourContractABI = "./contracts/VotingSystem";
const YOUR_CONTRACT_ADDRESS = "0x3d7B301021bB1A25546a25607f9A4DBe8484aF54";

function App() {
  const [web3, setWeb3] = useState(null); // State for web3
  const [contract, setContract] = useState(null); // State for your contract
  const [contractAddress, setContractAddress] = useState(""); // State for contract address

  useEffect(() => {
    // Initialize web3 and your contract here
    const initializeContract = async () => {
      try {
        // Connect to your Ethereum provider (Infura or local)
        const web3Instance = new Web3("YOUR_WEB3_PROVIDER_URL"); // Replace with your provider URL

        // Replace 'YourContractABI' with your actual contract ABI
        const contractABI = YourContractABI;

        // Replace 'YOUR_CONTRACT_ADDRESS' with your actual contract address
        const contractInstance = new web3Instance.eth.Contract(
          contractABI,
          YOUR_CONTRACT_ADDRESS
        );

        // Set the states
        setWeb3(web3Instance);
        setContract(contractInstance);
        setContractAddress("YOUR_CONTRACT_ADDRESS"); // Set your actual contract address
      } catch (error) {
        console.error("Error initializing web3 and contract:", error);
      }
    };

    initializeContract();

    // Clean up resources if needed
    return () => {
      // Clean up resources if necessary
    };
  }, []); // Empty dependency array to run this effect only once

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                web3={web3}
                contract={contract}
                contractAddress={contractAddress}
              />
            )}
          />
          <Route
            path="/authority"
            render={() => (
              <AuthorityPage
                web3={web3}
                contract={contract}
                contractAddress={contractAddress}
              />
            )}
          />
          <Route
            path="/register-voter"
            render={() => (
              <RegisterVoter
                web3={web3}
                contract={contract}
                contractAddress={contractAddress}
              />
            )}
          />
          <Route
            path="/register-candidate"
            render={() => (
              <RegisterCandidate
                web3={web3}
                contract={contract}
                contractAddress={contractAddress}
              />
            )}
          />
          <Route
            path="/vote"
            render={() => (
              <Vote
                web3={web3}
                contract={contract}
                contractAddress={contractAddress}
              />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
