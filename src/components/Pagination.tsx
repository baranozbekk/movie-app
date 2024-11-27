import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setPage } from '../redux/movieSlice';
import '../styles/components/Pagination.scss';

const Pagination: React.FC = () => {
  const { page } = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();

  const handleNext = () => dispatch(setPage(page + 1));
  const handlePrevious = () => dispatch(setPage(page - 1));

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Pagination;
