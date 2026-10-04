import axios from 'axios';

// This client is ready for future API calls; no dashboard data is requested in Step 1.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});
