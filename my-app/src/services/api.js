import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://my-8hsl85dea-jayendra123123s-projects.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pollAPI = {
  getAllPolls: async () => {
    const response = await api.get('/polls');
    return response.data;
  },

  getPoll: async (pollId) => {
    const response = await api.get(`/polls/${pollId}`);
    return response.data;
  },

  createPoll: async (pollData) => {
    const response = await api.post('/polls', pollData);
    return response.data;
  },
  vote: async (pollId, optionId, userId) => {
    const response = await api.post(`/polls/${pollId}/vote`, {
      optionId,
      userId,
    });
    return response.data;
  },
  toggleLike: async (pollId, userId) => {
    const response = await api.post(`/polls/${pollId}/like`, {
      userId,
    });
    return response.data;
  },
  deletePoll: async (pollId) => {
    const response = await api.delete(`/polls/${pollId}`);
    return response.data;
  },
};

export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
