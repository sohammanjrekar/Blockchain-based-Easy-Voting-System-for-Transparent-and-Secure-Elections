const { ethers } = require("hardhat");

async function main() {
  const candidateNames = ["Soham", "Gaytri", "Mihir"];
  const durationInMinutes = 20 * 24 * 60; // 20 days

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(candidateNames, durationInMinutes);

  await voting.deployed();

  console.log("Voting contract deployed to:", voting.address);

  // Use this section to change ownership after deployment
  // Replace '0xNewOwnerAddress' with the Ethereum address of the new owner
  const newOwnerAddress = '61ce89069b0f620bbfba14f0c8e6ae84740a5ebc9666c221ba95999b0d184241';
  const signer = (await ethers.getSigners())[0]; // Get the deployer's signer
  const votingContract = new ethers.Contract(voting.address, Voting.interface, signer);
  
  // Make sure to fund the new owner's address with Ether and unlock it before running this
  await votingContract.connect(signer).changeOwner(newOwnerAddress);

  console.log("Ownership transferred to:", newOwnerAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
