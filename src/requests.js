import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const addAnecdote = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

export const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote);
  return response.data;
};