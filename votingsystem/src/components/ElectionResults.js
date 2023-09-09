import React, { useEffect, useState } from "react";
import Web3 from "web3";

const contractABI = require("../contracts/voting_system.json");
function ElectionResults() {
  const [candidate1Votes, setCandidate1Votes] = useState(0);
  const [candidate2Votes, setCandidate2Votes] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleFetchResults = async () => {
    try {
      // Initialize Web3.js and load your contract
      const web3 = new Web3(Web3.givenProvider); // Initialize Web3 with the provider
      const networkId = await web3.eth.net.getId(); // Get the network ID
      const contractAddress = "0xCac8738a54AEAF5fe8F181d84E05E1B5996108c6"; // Replace with your contract address
      const contractABI = contractABI; // Replace with your contract's ABI

      const contract = new web3.eth.Contract(contractABI, contractAddress);

      // Get election results
      const result = await contract.methods.getElectionResults().call();

      // Update state to display the results
      setCandidate1Votes(result[0]);
      setCandidate2Votes(result[1]);
      setFeedback("Election results fetched successfully.");
    } catch (error) {
      console.error(error);
      setFeedback("Failed to fetch election results.");
    }
  };

  return (
    <div>
      <h2>Election Results</h2>
      <button onClick={handleFetchResults}>Fetch Results</button>
      <p>Candidate 1 Votes: {candidate1Votes}</p>
      <p>Candidate 2 Votes: {candidate2Votes}</p>
      <p>{feedback}</p>
    </div>
  );
}

export default ElectionResults;
