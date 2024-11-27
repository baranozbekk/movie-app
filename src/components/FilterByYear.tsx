import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setYear, setPage } from '../redux/movieSlice';
import '../styles/components/FilterByYear.scss';

const FilterByYear: React.FC = () => {
  const [year, setYearInput] = useState('');
  const dispatch = useDispatch();

  const handleFilter = () => {
    dispatch(setYear(year));
    dispatch(setPage(1));
  };

  return (
    <div className="filter-by-year">
      <input
        type="number"
        placeholder="Filter by year"
        value={year}
        onChange={e => setYearInput(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterByYear;
