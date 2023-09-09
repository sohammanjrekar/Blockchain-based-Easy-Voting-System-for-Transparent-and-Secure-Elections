// Import necessary libraries and components
import React, { useState } from "react";
import Web3 from "web3";
const contractABI = require("../contracts/voting_system.json");
function Voting() {
  // Declare state variables to manage user input and feedback
  const [feedback, setFeedback] = useState("");
  const [accounts, setAccounts] = useState(null);

  // Function to handle the vote casting process
  const handleVote = async (candidate) => {
    try {
      // Initialize Web3.js and load your contract
      const web3 = new Web3(Web3.givenProvider); // Initialize Web3 with the provider

      // Check if there's an active Ethereum provider (MetaMask, etc.)
      if (typeof web3 !== "undefined") {
        // Get the list of available accounts
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        // Replace with your contract address and ABI
        const contractAddress = "0xCac8738a54AEAF5fe8F181d84E05E1B5996108c6"; // Replace with your contract address
        const contractABI = contractABI; // Replace with your contract's ABI

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Send the transaction to cast a vote
        await contract.methods
          .voteForCandidate(candidate)
          .send({ from: accounts[0] });

        // Update the feedback state to show success
        setFeedback("Vote cast successfully.");
      } else {
        setFeedback(
          "Web3 provider not found. Please install MetaMask or use a compatible Ethereum wallet."
        );
      }
    } catch (error) {
      console.error(error);
      setFeedback("Failed to cast vote. Please try again.");
    }
  };

  return (
    <div>
      <h2>Vote for a Candidate</h2>
      {/* Render your candidate list here */}
      <button onClick={() => handleVote(1)}>Vote for Candidate 1</button>
      <button onClick={() => handleVote(2)}>Vote for Candidate 2</button>
      <p>{feedback}</p>
    </div>
  );
}

export default Voting;
