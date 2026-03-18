import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (message, sessionId = null) => {
  try {
    const response = await api.post('/chat', {
      message,
      session_id: sessionId
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getHistory = async (sessionId) => {
  try {
    const response = await api.get(`/history/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};