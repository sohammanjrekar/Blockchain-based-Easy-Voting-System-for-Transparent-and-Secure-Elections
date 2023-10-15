// Admin.js
import React from 'react';

function Admin({
  candidates,
  addCandidate,
  removeCandidate, // Add the removeCandidate function
  candidateName,
  setCandidateName,
  candidateIdno,
  setCandidateIdno,
  candidatePincode,
  setCandidatePincode,
}) {
  return (
    <div>
      
    
       



      <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">













    <div className="flex flex-col justify-center h-full">
      


    <div className="w-full bg-grey-500">
    <div className="container mx-auto py-8">
      <div className="w-96 mx-auto bg-white rounded shadow">
        <div className="mx-16 py-4 px-8 text-black text-xl font-bold border-b border-grey-500">
          Add New Candidate
        </div>
        <form onSubmit={(e) => {
        e.preventDefault();
        addCandidate();
      }}>
          <div className="py-4 px-8">
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">
              Candidate Name:
              </label>
              <input
                className=" border rounded w-full py-2 px-3 text-grey-darker"
                
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            required
          />"




              
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">
              Candidate ID No:
              </label>
              <input
                className=" border rounded w-full py-2 px-3 text-grey-darker"
                type="text"
            value={candidateIdno}
            onChange={(e) => setCandidateIdno(e.target.value)}
            required
              />
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">
              Candidate Pincode:
              </label>
              <input
                className=" border rounded w-full py-2 px-3 text-grey-darker"
                type="text"
            value={candidatePincode}
            onChange={(e) => setCandidatePincode(e.target.value)}
            required
              />
            </div>
            <div className="mb-4">
              <button className="mb-2 mx-16 rounded-full py-1 px-24 bg-gradient-to-r from-green-400 to-blue-500 " type="submit">Add 
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

      {/* Table */}
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Candidates</h2>
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
                    <div className="font-semibold text-left">Pincode</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
              {candidates.map((candidate, index) => (
                <tr  key={index}>
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
                    <div className="text-left font-medium text-green-500">
                    {candidate.pincode}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded" onClick={() => removeCandidate(index)}>
                      Delete
                    </button>
                  </td>
                </tr>   ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>












    </div>
  );
}

export default Admin;
