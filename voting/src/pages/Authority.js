import React, { useState } from "react";

function Authority({ web3, contract, contractAddress }) {
  const [authorityAddress, setAuthorityAddress] = useState("");

  const handleAddAuthority = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .addAuthority(authorityAddress)
        .send({ from: accounts[0] });
      console.log("Authority added successfully.");
    } catch (error) {
      console.error("Error adding authority:", error);
    }
  };

  return (
    <div>
      <h2>Authority Management</h2>
      <input
        type="text"
        placeholder="Authority Address"
        value={authorityAddress}
        onChange={(e) => setAuthorityAddress(e.target.value)}
      />
      <button onClick={handleAddAuthority}>Add Authority</button>
    </div>
  );
}

export default Authority;
