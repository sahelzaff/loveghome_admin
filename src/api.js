// api.js
export const getLeads = async () => {
    // Fetch total leads from the server
    const response = await fetch('/api/leads');
    const data = await response.json();
    return data.length;
  };
  
  export const getFreshLeads = async () => {
    // Fetch fresh leads from the server (leads created in the last 24 hours)
    const response = await fetch('/api/leads?fresh=true');
    const data = await response.json();
    return data.length;
  };
  
  export const getLeadConversionRate = async () => {
    // Fetch lead conversion rate from the server
    const response = await fetch('/api/leads/conversion-rate');
    const data = await response.json();
    return data.conversionRate;
  };
  
  export const getLeadSources = async () => {
    // Fetch lead sources breakdown from the server
    const response = await fetch('/api/leads/sources');
    const data = await response.json();
    return data.sources;
  };
  