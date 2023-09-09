// Import necessary libraries and components
import React, { useState } from "react";
import Web3 from "web3";
const contractABI = require("../contracts/voting_system.json");
function Home() {
  // Declare state variables to manage user input and feedback
  const [voterAddress, setVoterAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [accounts, setAccounts] = useState(null);

  // Function to handle voter registration
  const handleRegisterVoter = async () => {
    try {
      // Initialize Web3.js and load your contract (similar to previous example)
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

        // Send the transaction to register a voter
        await contract.methods
          .registerVoter(voterAddress)
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
      {/* Render input field for voter's Ethereum address */}
      <input
        type="text"
        placeholder="Voter's Ethereum Address"
        value={voterAddress}
        onChange={(e) => setVoterAddress(e.target.value)}
      />
      <button onClick={handleRegisterVoter}>Register Voter</button>
      <p>{feedback}</p>
    </div>
  );
}

export default Home;
