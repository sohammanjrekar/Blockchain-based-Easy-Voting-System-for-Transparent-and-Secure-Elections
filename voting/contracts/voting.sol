// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    // Struct to represent a Voter
    struct Voter {
        bool hasVoted;      // Indicates if the voter has already cast a vote
        bool isRegistered;  // Indicates if the voter is registered to vote
        bool isResident;    // Indicates if the voter resides in the election constituency
        uint256 age;        // Age of the voter
        uint256 voterID;    // Voter ID number
    }

    // Struct to represent a Candidate
    struct Candidate {
        uint256 candidateID;  // Candidate ID
        string name;          // Candidate's name
        string party;         // Candidate's party affiliation
        string aadharNumber;  // Candidate's Aadhar Number
        string panNumber;     // Candidate's PAN Number
        bool isRegistered;    // Indicates if the candidate is registered
        bool isResident;      // Indicates if the candidate is a resident
        uint256 age;          // Age of the candidate
    }

    address public electionAuthority;     // Address of the election authority
    mapping(address => bool) public authorities; // Mapping to distinguish authorities (cannot vote)
    mapping(address => Voter) public voters;     // Mapping to associate each voter's address with their voter struct
    Candidate[] public candidates;              // Array to store candidate information

    uint256 public registrationStartDate; // Start date for voter registration
    uint256 public registrationEndDate;   // End date for voter registration
    uint256 public votingStartDate;      // Start date for voting
    uint256 public votingEndDate;        // End date for voting

    event VoteCast(address indexed voter, uint256 candidateIndex); // Event to log when a vote is cast

    modifier onlyAuthority() {
        require(msg.sender == electionAuthority, "Only the election authority can call this function");
        _;
    }

    constructor(
        uint256 _registrationStartDate,
        uint256 _registrationEndDate,
        uint256 _votingStartDate,
        uint256 _votingEndDate
    ) {
        electionAuthority = msg.sender;
        authorities[msg.sender] = true;
        registrationStartDate = _registrationStartDate;
        registrationEndDate = _registrationEndDate;
        votingStartDate = _votingStartDate;
        votingEndDate = _votingEndDate;
    }

    // Function to allow authorities to add themselves
    function addAuthority(address _authorityAddress) public onlyAuthority {
        authorities[_authorityAddress] = true;
    }

    // Function for voters to register
    function registerVoter(uint256 _age, uint256 _voterID, bool _isResident) public {
        require(block.timestamp >= registrationStartDate && block.timestamp <= registrationEndDate, "Registration is closed");
        require(!voters[msg.sender].isRegistered, "Already registered");
        require(_age >= 18, "Age must be 18 or older");
        require(_isResident, "Voter must be a resident");

        voters[msg.sender] = Voter({ hasVoted: false, isRegistered: true, isResident: _isResident, age: _age, voterID: _voterID });
    }

    // Function for authorities to add candidates
    function addCandidate(string memory _name, string memory _party, string memory _aadharNumber, string memory _panNumber, bool _isRegistered, bool _isResident, uint256 _age) public onlyAuthority {
        require(block.timestamp >= registrationStartDate && block.timestamp <= registrationEndDate, "Candidate registration is closed");
        uint256 candidateID = candidates.length; // Assign candidate ID as the current length of the candidates array
        candidates.push(Candidate({ candidateID: candidateID, name: _name, party: _party, aadharNumber: _aadharNumber, panNumber: _panNumber, isRegistered: _isRegistered, isResident: _isResident, age: _age }));
    }

    // Function to retrieve the list of all candidates
    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // Function for voters to cast their votes
    function voteForCandidate(uint256 _candidateIndex) public {
        require(block.timestamp >= votingStartDate && block.timestamp <= votingEndDate, "Voting is closed");
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(_candidateIndex < candidates.length, "Invalid candidate index");

        voters[msg.sender].hasVoted = true;
        emit VoteCast(msg.sender, _candidateIndex);
    }

    // Function to get the election results
    function getElectionResults() public view returns (uint256[] memory) {
        uint256[] memory results = new uint256[](candidates.length);
        for (uint256 i = 0; i < candidates.length; i++) {
            results[i] = i;
        }
        return results;
    }
}
