import React from 'react';
import { useDispatch } from 'react-redux';
import { setType, setPage } from '../redux/movieSlice';
import '../styles/components/FilterByType.scss';

const FilterByType: React.FC = () => {
  const dispatch = useDispatch();

  const handleTypeChange = (type: string) => {
    dispatch(setType(type));
    dispatch(setPage(1));
  };

  return (
    <div className="filter-by-type">
      <button onClick={() => handleTypeChange('movie')}>Movies</button>
      <button onClick={() => handleTypeChange('series')}>TV Series</button>
      <button onClick={() => handleTypeChange('episode')}>Episodes</button>
    </div>
  );
};

export default FilterByType;
