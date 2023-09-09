import React, { useState } from "react";

function RegisterVoter({ web3, contract, contractAddress }) {
  const [age, setAge] = useState(0);
  const [voterID, setVoterID] = useState("");
  const [isResident, setIsResident] = useState(false);

  const handleRegisterVoter = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .registerVoter(age, voterID, isResident)
        .send({ from: accounts[0] });
      console.log("Voter registered successfully.");
    } catch (error) {
      console.error("Error registering voter:", error);
    }
  };

  return (
    <div>
      <h2>Voter Registration</h2>
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Voter ID"
        value={voterID}
        onChange={(e) => setVoterID(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isResident}
          onChange={() => setIsResident(!isResident)}
        />
        Is Resident
      </label>
      <button onClick={handleRegisterVoter}>Register Voter</button>
    </div>
  );
}

export default RegisterVoter;
