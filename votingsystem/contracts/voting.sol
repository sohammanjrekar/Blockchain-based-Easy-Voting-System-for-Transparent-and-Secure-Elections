// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IndianElectionSystem {
    // Struct to represent a voter
    struct Voter {
        bool hasVoted;     // Indicates if the voter has already cast a vote
        bool isRegistered; // Indicates if the voter is registered to vote
        bool isResident;   // Indicates if the voter resides in the election constituency
        uint256 age;       // Age of the voter
        uint256 voterID;   // Voter ID number
    }

    // Struct to represent a candidate
    struct Candidate {
        string name;     // Candidate's name
        string party;    // Candidate's party affiliation
        uint8 constituency; // Constituency number the candidate is running in
    }

    // Struct to represent election results
    struct ElectionResult {
        uint256 candidate1Votes; // Vote count for candidate 1
        uint256 candidate2Votes; // Vote count for candidate 2
    }

    // Mapping to associate each voter's address with their voter struct
    mapping(address => Voter) public voters;

    // Mapping to store candidate information by candidate number
    mapping(uint8 => Candidate) public candidates;

    // Mapping to distinguish authorities (cannot vote)
    mapping(address => bool) public authorities;

    // Address of the election authority
    address public electionAuthority;

    // Mapping to keep track of whether a candidate with a specific number exists
    mapping(uint8 => bool) public candidateExists;

    // Election results
    ElectionResult public electionResults;

    // Event to log when a vote is cast
    event VoteCast(address indexed voter, uint8 candidate);

    // Modifier to restrict functions to the election authority only
    modifier onlyAuthority() {
        require(msg.sender == electionAuthority, "Only election authority can call this function");
        _;
    }

    // Constructor to set the election authority
    constructor() {
        electionAuthority = msg.sender;
        authorities[msg.sender] = true; // Authority is added during contract deployment
    }

    // Function to allow authorities to add themselves
    function addAuthority(address _authorityAddress) public onlyAuthority {
        authorities[_authorityAddress] = true;
    }

    // Function to register a voter
    function registerVoter(address _voterAddress, bool _isResident, uint256 _age, uint256 _voterID) public onlyAuthority {
        voters[_voterAddress] = Voter({
            hasVoted: false,
            isRegistered: true,
            isResident: _isResident,
            age: _age,
            voterID: _voterID
        });
    }

    // Function to add a candidate (only authority can add)
    function addCandidate(uint8 _candidateNumber, string memory _name, string memory _party, uint8 _constituency) public onlyAuthority {
        require(!candidateExists[_candidateNumber], "Candidate already exists");

        candidates[_candidateNumber] = Candidate({
            name: _name,
            party: _party,
            constituency: _constituency
        });

        // Mark the candidate as existing
        candidateExists[_candidateNumber] = true;
    }

    // Function for voters to cast their votes
    function voteForCandidate(uint8 _candidate) public {
        Voter storage voter = voters[msg.sender];

        require(voter.isRegistered, "Voter is not registered");
        require(!voter.hasVoted, "Already voted");
        require(candidates[_candidate].constituency == 1, "Candidate is not in your constituency");

        // Check if the sender is not an authority
        require(!authorities[msg.sender], "Authorities cannot vote");

        // Mark the voter as having voted
        voter.hasVoted = true;

        // Update the vote count for the chosen candidate
        if (_candidate == 1) {
            electionResults.candidate1Votes++;
        } else {
            electionResults.candidate2Votes++;
        }

        // Emit a vote cast event
        emit VoteCast(msg.sender, _candidate);
    }

    // Function for authorities to verify a candidate
    function verifyCandidate(uint8 _candidateNumber) public view onlyAuthority {
        require(bytes(candidates[_candidateNumber].name).length > 0, "Candidate does not exist");
        // You can add more verification logic here as needed
    }

    // Function for authorities to verify a voter
    function verifyVoter(address _voterAddress) public view onlyAuthority {
        require(voters[_voterAddress].isRegistered, "Voter is not registered");
        // You can add more verification logic here as needed
    }

    // Function to get the election results
    function getElectionResults() public view returns (uint256, uint256) {
        return (electionResults.candidate1Votes, electionResults.candidate2Votes);
    }
}
