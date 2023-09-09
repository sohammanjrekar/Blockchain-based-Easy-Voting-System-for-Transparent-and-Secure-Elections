const VotingSystem = artifacts.require("VotingSystem");

module.exports = function (deployer) {
  // Define your desired start and end dates here
  const registrationStartDate = 1694216568; //Sat Sep 09 2023 05:12:48 GMT+0530 (India Standard Time)
  const registrationEndDate = 1702078968; //Sat Dec 09 2023 05:12:48 GMT+0530 (India Standard Time
  const votingStartDate = 1694216568; //Sat Sep 09 2023 05:12:48 GMT+0530 (India Standard Time)
  const votingEndDate = 1702078968; //Sat Dec 09 2023 05:12:48 GMT+0530 (India Standard Time

  deployer.deploy(
    VotingSystem,
    registrationStartDate,
    registrationEndDate,
    votingStartDate,
    votingEndDate
  );
};
