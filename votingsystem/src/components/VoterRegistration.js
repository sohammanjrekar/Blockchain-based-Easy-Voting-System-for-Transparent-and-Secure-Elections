// Import necessary libraries and components
import React, { useState } from "react";
import Web3 from "web3";
const contractABI = require("../contracts/voting_system.json");
function VoterRegistration() {
  // Declare state variables to manage user input and feedback
  const [feedback, setFeedback] = useState("");
  const [accounts, setAccounts] = useState(null);

  // Function to handle voter registration
  const handleRegistration = async (isResident, age, voterID) => {
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

        // Send the transaction to register the voter
        await contract.methods
          .registerVoter(accounts[0], isResident, age, voterID)
          .send({ from: accounts[0] });

        // Update the feedback state to show success
        setFeedback("Voter registered successfully.");
      } else {
        setFeedback(
          "Web3 provider not found. Please install MetaMask or use a compatible Ethereum wallet."
        );
      }
    } catch (error) {
      console.error(error);
      setFeedback("Failed to register voter. Please try again.");
    }
  };

  return (
    <div>
      <h2>Voter Registration</h2>
      {/* Render input fields for registration information */}
      <button onClick={() => handleRegistration(true, 18, "VOTER_ID")}>
        Register Voter
      </button>
      <p>{feedback}</p>
    </div>
  );
}

export default VoterRegistration;
