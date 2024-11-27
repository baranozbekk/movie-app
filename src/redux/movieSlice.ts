import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//This api key would normally be in a different file for production
//but since it's a free, read-only and limited key that anybody can get
//i leave it here just to avoid sending seperate env files via email
const API_KEY = '53efa3f0';
const BASE_URL = 'http://www.omdbapi.com/';

interface MovieState {
  movies: any[];
  selectedMovie: any | null;
  query: string;
  year: string;
  type: string;
  page: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  query: 'Pokemon',
  year: '',
  type: '',
  page: 1,
  status: 'idle',
  error: null,
};

// Fetch movies
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { getState }) => {
  const state = getState() as { movies: MovieState };
  const { query, year, type, page } = state.movies;
  console.log('query is: ', query);
  console.log('year is: ', year);
  console.log('type is: ', type);
  console.log('page is: ', page);
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}${year && `&y=${year}`}${
    type && `&type=${type}`
  }`;

  const response = await axios.get(url);
  if (response.data.Response === 'False') {
    throw new Error(response.data.Error);
  }
  return response.data.Search;
});

// Fetch movie details
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID: string) => {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
    const response = await axios.get(url);
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearSelectedMovie(state) {
      state.selectedMovie = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies.';
      })
      .addCase(fetchMovieDetails.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movie details.';
      });
  },
});

export const { setQuery, setYear, setType, setPage, clearSelectedMovie } = movieSlice.actions;

export default movieSlice.reducer;
