import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-api-server-h6ib.onrender.com/api',
});

export default api;