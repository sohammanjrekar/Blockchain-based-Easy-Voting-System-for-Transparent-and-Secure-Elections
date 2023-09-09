import React, { useState } from "react";

function Vote({ web3, contract, contractAddress, candidates }) {
  const [selectedCandidate, setSelectedCandidate] = useState(0);

  const handleVote = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .voteForCandidate(selectedCandidate)
        .send({ from: accounts[0] });
      console.log("Vote cast successfully.");
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  return (
    <div>
      <h2>Vote</h2>
      <p>Select a candidate to vote for:</p>
      <select
        value={selectedCandidate}
        onChange={(e) => setSelectedCandidate(e.target.value)}
      >
        {candidates.map((candidate, index) => (
          <option key={index} value={index}>
            {candidate.name} - {candidate.party}
          </option>
        ))}
      </select>
      <button onClick={handleVote}>Cast Vote</button>
    </div>
  );
}

export default Vote;
