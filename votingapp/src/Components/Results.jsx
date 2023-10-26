import React from 'react';

function Results({ candidates }) {
  const maxVotes = Math.max(...candidates.map((candidate) => candidate.voteCount));
  const winner = candidates.find((candidate) => candidate.voteCount === maxVotes);

  return (
    <div>


{/* component */}
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








  <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
    <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
      <img
        src="https://static.vecteezy.com/system/resources/previews/001/942/668/large_2x/gold-winner-celebration-banner-with-trophy-vector.jpg"
        alt="image"
        className="h-full w-full object-cover"
      />
    </div>
    <div className="p-6">
      <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
     Winner 
      </h6>
      <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
      Winner: {winner ? `${winner.name} ` : 'No winner yet'}
  
      </h4>
      <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
      {winner ? `"Congratulations to the winning candidate! 🏆 ${winner.name} has secured victory with  ${winner.voteCount} votes votes in the election. Thank you to all participants for exercising their right to vote and making this election a success` : 'No winner yet'}


  
      </p>
      
    </div>
  </div>
  
  
</div>



   
    

 
     
  );
}


export default Results;
