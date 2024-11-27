import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchMovieDetails } from '../redux/movieSlice';
import '../styles/pages/DetailsPage.scss';

const DetailsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Typed dispatch
  const { selectedMovie, status, error } = useSelector((state: RootState) => state.movies);
  const imdbID = new URLSearchParams(window.location.search).get('id');

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetails(imdbID)); // Properly typed dispatch
    }

    return () => {
      // Cleanup or reset logic if needed
    };
  }, [dispatch, imdbID]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  if (!selectedMovie) return <p>Movie not found.</p>;

  return (
    <div className="details-page">
      <h1>{selectedMovie.Title}</h1>
      <img
        src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : ''}
        alt={selectedMovie.Title}
      />
      <p>
        <strong>Year:</strong> {selectedMovie.Year}
      </p>
      <p>
        <strong>Genre:</strong> {selectedMovie.Genre}
      </p>
      <p>
        <strong>Director:</strong> {selectedMovie.Director}
      </p>
      <p>
        <strong>Cast:</strong> {selectedMovie.Actors}
      </p>
      <p>
        <strong>IMDb Rating:</strong> {selectedMovie.imdbRating}
      </p>
      <p>
        <strong>Plot:</strong> {selectedMovie.Plot}
      </p>
    </div>
  );
};

export default DetailsPage;
