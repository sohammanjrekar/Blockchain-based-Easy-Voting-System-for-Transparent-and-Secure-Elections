import React, { useState, useEffect } from "react";
import Web3 from "web3";
const YOUR_CONTRACT_ADDRESS = "0xCac8738a54AEAF5fe8F181d84E05E1B5996108c6";
const contractABI = require("../contracts/voting_system.json");

function AuthorityPage() {
  const [candidateName, setCandidateName] = useState("");
  const [party, setParty] = useState("");
  const [constituency, setConstituency] = useState(0); // Initialize constituency as a valid uint8
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  // Initialize Web3 and set up the contract instance
  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);

          // Initialize the contract
          const myContract = new web3.eth.Contract(
            contractABI,
            YOUR_CONTRACT_ADDRESS
          );
          setContract(myContract);
        } catch (error) {
          console.error("Error connecting to Metamask:", error);
        }
      }
    }
    initWeb3();
  }, []);

  const handleAddCandidate = async () => {
    if (!contract || !accounts.length) {
      console.error("Missing contract instance or accounts.");
      return;
    }

    // Validate candidateName and party as non-empty strings
    if (!candidateName.trim() || !party.trim()) {
      setError("Candidate name and party must not be empty.");
      return;
    }

    // Validate constituency as a valid uint8
    const parsedConstituency = parseInt(constituency);
    if (
      isNaN(parsedConstituency) ||
      parsedConstituency < 1 ||
      parsedConstituency > 255
    ) {
      setError("Constituency must be a valid uint8 (1-255).");
      return;
    }

    try {
      await contract.methods
        .addCandidate(candidateName, party, parsedConstituency)
        .send({ from: accounts[0] });
      console.log("Candidate added successfully.");
      // Clear input fields
      setCandidateName("");
      setParty("");
      setConstituency(0);
      setError(null);
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <div>
      <h2>Authority Page</h2>
      <div>
        <h3>Add Candidate</h3>
        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
        />
        <input
          type="number"
          placeholder="Constituency (1-255)"
          value={constituency}
          onChange={(e) => setConstituency(e.target.value)}
        />
        <button onClick={handleAddCandidate}>Add Candidate</button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {/* Add more authority-specific functionality here */}
    </div>
  );
}

export default AuthorityPage;
