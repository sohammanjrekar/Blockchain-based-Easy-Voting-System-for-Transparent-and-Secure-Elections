// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
        string idno;
        uint256 pincode;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => bool) public voters;

    uint256 public votingStart;
    uint256 public votingEnd;

    constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0,
                idno: "",
                pincode: 0
            }));
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name, string memory _idno, uint256 _pincode) public onlyOwner {
        candidates.push(Candidate({
            name: _name,
            voteCount: 0,
            idno: _idno,
            pincode: _pincode
        }));
    }

    function removeCandidate(uint256 _candidateIndex) public onlyOwner {
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        for (uint256 i = _candidateIndex; i < candidates.length - 1; i++) {
            candidates[i] = candidates[i + 1];
        }
        candidates.pop();
    }

    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        require(block.timestamp >= votingStart && block.timestamp < votingEnd, "Voting is not open.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    // New function to get the count of candidates
    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    // New function to get candidate details by index
    function getCandidate(uint256 index) public view returns (Candidate memory) {
        require(index < candidates.length, "Invalid candidate index");
        return candidates[index];
    }

    function getVotingStatus() public view returns (bool) {
        return block.timestamp >= votingStart && block.timestamp < votingEnd;
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
    }

    // Function to change the owner
    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
