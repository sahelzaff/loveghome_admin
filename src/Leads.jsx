import React, { useState } from 'react';
import Modal from './Modal';

const Leads = ({ leads, refreshData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const rowsPerPage = 10;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Create a copy of the leads array and sort it by creation date in descending order
  const sortedLeads = leads.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredLeads = sortedLeads.filter(
    (lead) =>
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastLead = currentPage * rowsPerPage;
  const indexOfFirstLead = indexOfLastLead - rowsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedLead) {
      try {
        const response = await fetch(`http://localhost:4000/api/leads/${selectedLead._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          refreshData();
          setShowModal(false);
          setSelectedLead(null);
        } else {
          console.error('Failed to delete the lead');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
   

  return (
    <div className='w-full h-auto max-w-screen-4xl px-10'>
      <div>
        <h1 className='font-extrabold text-[#f0532d] text-5xl px-5'>Leads</h1>
        <div className='w-full h-[0.15rem] bg-gray-300'></div>
        <div className='my-4 flex flex-row justify-end items-center w-full gap-5'>
          <input
            type='text'
            placeholder='Search by name'
            value={searchTerm}
            onChange={handleSearch}
            className='w-2/6 p-2 border border-gray-300 rounded'
          />
          <div className="flex justify-end my-4">
            <button
              onClick={refreshData}
              className="bg-[#f0532d] font-bold text-white px-4 py-2 rounded"
            >
              Refresh
            </button>
          </div>
        </div>
        <table className='min-w-full bg-[#f0532d] mt-5 text-white'>
          <thead>
            <tr>
              <th className='py-2 px-4'>Firstname</th>
              <th className='py-2 px-4'>Lastname</th>
              <th className='py-2 px-4'>PhoneNumber</th>
              <th className='py-2 px-4'>Email</th>
              <th className='py-2 px-4'>Message</th>
              <th className='py-2 px-4'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-[#f4f4f4] text-center'>
            {currentLeads.map((lead) => (
              <tr
                key={lead._id}
                className='text-black border-b border-gray-300 cursor-pointer hover:bg-gray-200'
              >
                <td className='py-2 px-4'>{lead.firstName}</td>
                <td className='py-2 px-4'>{lead.lastName}</td>
                <td className='py-2 px-4'>{lead.phone}</td>
                <td className='py-2 px-4'>{lead.email}</td>
                <td className='py-2 px-4'>{lead.message}</td>
                <td className='py-2 px-4'>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='bg-red-500 text-white px-4 py-2 rounded'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center mt-10 mb-6 text-white font-bold'>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-4 py-2 mx-1 bg-[#f0532d] rounded hover:bg-orange-400 disabled:opacity-50'
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1 ? 'bg-[#f0532d]' : 'bg-orange-400'
              } rounded hover:bg-orange-400`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-4 py-2 mx-1 bg-[#f0532d] rounded hover:bg-orange-400 disabled:opacity-50'
          >
            Next
          </button>
        </div>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Leads;
