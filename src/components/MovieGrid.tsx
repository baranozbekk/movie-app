import React from 'react';

interface MovieGridProps {
  movies: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  }[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <div key={movie.imdbID} className="movie-card">
          <img src={movie.Poster !== 'N/A' ? movie.Poster : ''} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
