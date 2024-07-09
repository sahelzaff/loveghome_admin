import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, subDays } from 'date-fns';

const Homepage = ({ leads, refreshData }) => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [freshLeads, setFreshLeads] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [leadSources, setLeadSources] = useState([]);

  useEffect(() => {
    calculateInsights();
  }, [leads]);

  const calculateInsights = () => {
    setTotalLeads(leads.length);

    const freshLeadsCount = leads.filter(lead => {
      const leadDate = new Date(lead.createdAt);
      return leadDate >= subDays(new Date(), 1);
    }).length;
    setFreshLeads(freshLeadsCount);

    setConversionRate(0); // Replace with actual calculation
    setLeadSources([
      { name: 'Social Media', count: 0 },
      { name: 'Referral', count: 0 },
      { name: 'Organic Search', count: 0 },
    ]);
  };

  return (
    <div className="px-10">
      <h1 className="font-extrabold text-[#f0532d] text-5xl mb-1">Welcome Admin</h1>
      <div className='w-full h-[0.15rem] bg-gray-300 mb-5'></div>
      <div className="flex justify-end mb-4">
        <button
          onClick={refreshData}
          className="bg-[#f0532d] font-bold text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-white  rounded shadow-md">
          <iframe
            title="MongoDB Charts"
            width="100%"
            height="250"
            src="https://charts.mongodb.com/charts-love-home-conveyancing-da-wnsimtc/embed/charts?id=667b1652-cac6-4f47-85cb-0096b3d62671&maxDataAge=3600&theme=light&autoRefresh=true"
            frameBorder="0"
          ></iframe>
        </div>
        <div className="bg-white  rounded shadow-md">
          <iframe
            title="MongoDB Charts"
            width="100%"
            height="250"
            src="https://charts.mongodb.com/charts-love-home-conveyancing-da-wnsimtc/embed/charts?id=667b15bc-30ba-41ea-80d9-bac92e36160e&maxDataAge=3600&theme=light&autoRefresh=true"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
      <div className="flex flex-row mt-20  gap-10">

        <div className="bg-white  rounded shadow-md w-4/6 border-r-2 border-gray-200">
          <iframe
            title="MongoDB Charts"
            width="100%"
            height="400"
            src="https://charts.mongodb.com/charts-love-home-conveyancing-da-wnsimtc/embed/charts?id=667b14b8-fd48-4e65-86aa-d3e60b3eee8f&maxDataAge=-1&theme=light&autoRefresh=false"
            frameBorder="0"
          ></iframe>
        </div>

        <div className="bg-white p-4 rounded shadow-md w-2/6 border-l-2 border-gray-200">
          <iframe
            title="MongoDB Charts"
            width="100%"
            height="400"
            src="https://charts.mongodb.com/charts-love-home-conveyancing-da-wnsimtc/embed/charts?id=667b104f-909e-464f-8fac-41322c20fef5&maxDataAge=-1&theme=light&autoRefresh=false"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
        <div className="bg-white p-4 rounded shadow-md w-full border-l-2 border-gray-200">
          <iframe
            title="MongoDB Charts"
            width="100%"
            height="400"
            src="https://charts.mongodb.com/charts-love-home-conveyancing-da-wnsimtc/embed/charts?id=667b1b2f-03c5-460b-8e18-2511b5ba22a5&maxDataAge=-1&theme=light&autoRefresh=false"
            frameBorder="0"
          ></iframe>
        </div>
    </div>
  );
};

const InsightBox = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow-md text-center">
    <h2 className="text-xl mb-2">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const LeadSourceBreakdown = ({ sources }) => (
  <div className="bg-white p-4 rounded shadow-md">
    <h2 className="text-xl mb-2">Lead Source Breakdown</h2>
    <ul>
      {sources.map((source, index) => (
        <li key={index} className="flex justify-between">
          <span>{source.name}</span>
          <span>{source.count}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Homepage;
