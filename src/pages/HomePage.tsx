import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchMovies, setQuery, setYear, setType, setPage } from '../redux/movieSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/HomePage.scss';

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { movies, query, year, type, page, status, error } = useSelector(
    (state: RootState) => state.movies
  );

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Handle Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setQuery(debouncedQuery));
    }, 2000);

    return () => clearTimeout(timer);
  }, [debouncedQuery, dispatch]);

  // Fetch movies on initial load and when filters change
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch, query, year, type, page]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setYear(e.target.value));
    dispatch(setPage(1)); // Reset to the first page
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setType(e.target.value));
    dispatch(setPage(1)); // Reset to the first page
  };

  return (
    <div className="home-page">
      <h1>Movie Browser</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={debouncedQuery}
          onChange={e => setDebouncedQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by year"
          value={year}
          onChange={handleYearChange}
        />
        <select value={type} onChange={handleTypeChange}>
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
          <option value="episode">Episodes</option>
        </select>
      </div>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && movies.length === 0 && <p>No movies found.</p>}

      {status === 'succeeded' && movies.length > 0 && (
        <table className="movies-table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Name</th>
              <th>Year</th>
              <th>IMDb ID</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr
                key={movie.imdbID}
                onClick={() => navigate(`/details?id=${movie.imdbID}`)}
                className="clickable-row"
              >
                <td>
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : ''}
                    alt={movie.Title}
                    className="movie-poster"
                  />
                </td>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1 || status === 'loading'}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => dispatch(setPage(page + 1))} disabled={status === 'loading'}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
