import React, { useState } from "react";

function RegisterCandidate({ web3, contract, contractAddress }) {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isResident, setIsResident] = useState(false);
  const [candidateAge, setCandidateAge] = useState(0);

  const handleRegisterCandidate = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .addCandidate(
          name,
          party,
          aadharNumber,
          panNumber,
          isRegistered,
          isResident,
          candidateAge
        )
        .send({ from: accounts[0] });
      console.log("Candidate registered successfully.");
    } catch (error) {
      console.error("Error registering candidate:", error);
    }
  };

  return (
    <div>
      <h2>Candidate Registration</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Party"
        value={party}
        onChange={(e) => setParty(e.target.value)}
      />
      <input
        type="text"
        placeholder="Aadhar Number"
        value={aadharNumber}
        onChange={(e) => setAadharNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="PAN Number"
        value={panNumber}
        onChange={(e) => setPanNumber(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isRegistered}
          onChange={() => setIsRegistered(!isRegistered)}
        />
        Is Registered
      </label>
      <label>
        <input
          type="checkbox"
          checked={isResident}
          onChange={() => setIsResident(!isResident)}
        />
        Is Resident
      </label>
      <input
        type="number"
        placeholder="Age"
        value={candidateAge}
        onChange={(e) => setCandidateAge(e.target.value)}
      />
      <button onClick={handleRegisterCandidate}>Register Candidate</button>
    </div>
  );
}

export default RegisterCandidate;
