import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Ganti dengan IP server Flask Anda
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;