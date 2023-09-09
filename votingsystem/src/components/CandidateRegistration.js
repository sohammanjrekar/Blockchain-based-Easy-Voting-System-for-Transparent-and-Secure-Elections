// Import necessary libraries and components
import React, { useState } from "react";
import Web3 from "web3";
const contractABI = require("../contracts/voting_system.json");
function CandidateRegistration() {
  // Declare state variables to manage user input and feedback
  const [candidateName, setCandidateName] = useState("");
  const [party, setParty] = useState("");
  const [feedback, setFeedback] = useState("");
  const [accounts, setAccounts] = useState(null);

  // Function to handle candidate registration
  const handleAddCandidate = async () => {
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

        // Send the transaction to add a candidate
        await contract.methods
          .addCandidate(candidateName, party)
          .send({ from: accounts[0] });

        // Update the feedback state to show success
        setFeedback("Candidate added successfully.");
      } else {
        setFeedback(
          "Web3 provider not found. Please install MetaMask or use a compatible Ethereum wallet."
        );
      }
    } catch (error) {
      console.error(error);
      setFeedback("Failed to add candidate. Please try again.");
    }
  };

  return (
    <div>
      <h2>Candidate Registration</h2>
      {/* Render input fields for candidate name and party */}
      <input
        type="text"
        placeholder="Candidate Name"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Political Party"
        value={party}
        onChange={(e) => setParty(e.target.value)}
      />
      <button onClick={handleAddCandidate}>Add Candidate</button>
      <p>{feedback}</p>
    </div>
  );
}

export default CandidateRegistration;
