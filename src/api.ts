import axios from 'axios';

const API_KEY = '53efa3f0';
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (query: string, type: string, year: string, page: number) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      type,
      y: year,
      page,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (id: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
    },
  });
  return response.data;
};
