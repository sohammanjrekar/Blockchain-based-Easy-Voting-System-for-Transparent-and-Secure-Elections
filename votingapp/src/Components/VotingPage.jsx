import React, { useState } from 'react';
import CandidateItem from './CandidateItem';

function VotingPage({ candidates, vote, hasVoted }) {
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(-1);
  const [error, setError] = useState('');

  const handleVote = () => {
    if (selectedCandidateIndex >= 0) {
      console.log("Selected candidate index:", selectedCandidateIndex);
      if (!hasVoted) {
        console.log("Voting...");
        vote(selectedCandidateIndex);
      } else {
        setError('You have already voted.');
      }
    } else {
      setError('Please select a candidate before voting.');
    }
  }
  

  return (
    <div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {candidates && candidates.length > 0 ? (
        <div >
          
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10 mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-indigo-700 font-black leading-7 md:leading-10">
          Select a candidate by their index and click "Vote" to cast your vote 
          </h1>
         
        </div> 
        
<section className="antialiased bg-gray-100 text-gray-600 py-5 px-4">
    <div className="flex flex-col justify-center h-full">
      {/* Table */}
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Results</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Index</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">VoteCount</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
              {candidates.map((candidate, index) => (

<tr key={index}>
<td className="p-2 whitespace-nowrap">
  <div className="flex items-center">
    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
      <img
        className="rounded-full"
        src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
        width={40}
        height={40}
        alt="Burak Long"
      />
    </div>
    <div className="font-medium text-gray-800">
    {candidate.name}
    </div>
  </div>
</td>
<td className="p-2 whitespace-nowrap">
  <div className="text-left">{index}</div>
</td> 
<td className="p-2 whitespace-nowrap">
  <div className="text-left">{candidate.voteCount} vote{candidate.voteCount !== 1 ? 's' : ''}</div>
</td>                  
</tr>
        ))}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div className="w-full bg-grey-500">
    <div className="container mx-auto py-8">
      <div className="w-96 mx-auto bg-white rounded shadow">
        <div className="mx-16 py-4 px-8 text-black text-xl font-bold border-b border-grey-500">
       Give Vote
        </div>
        <form name="student_application" id="student_application" action="">
          <div className="py-4 px-8">
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">
              Select a candidate:
              </label>
              <input
                className=" border rounded w-full py-2 px-3 text-grey-darker"
                type="number"
                value={selectedCandidateIndex}
                onChange={(e) => {
                  setSelectedCandidateIndex(parseInt(e.target.value, 10));
                  setError('');
                }}
              />
            </div>
            <div className="mb-4">
              <button className="mb-2 mx-16 rounded-full py-1 px-24 bg-gradient-to-r from-green-400 to-blue-500 " onClick={handleVote}>
                Vote
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>


          







        </div>
      ) : (
        <p>Loading candidates...</p>
      )}
    </div>
  );
}

export default VotingPage;
