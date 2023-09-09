const YourContract = artifacts.require("IndianElectionSystem"); // Replace "YourContract" with your contract's name

module.exports = function (deployer) {
  deployer.deploy(YourContract);
};
