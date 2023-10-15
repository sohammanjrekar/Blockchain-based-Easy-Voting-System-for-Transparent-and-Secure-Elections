// CandidateItem.js
import React from 'react';

function CandidateItem({ candidate, index }) {
  return (
    <tr>
      <td>{index}</td>
      <td>{candidate.name}</td>
      <td>{candidate.voteCount}</td> {/* Display the vote count */}
    </tr>
  );
}

export default CandidateItem;
