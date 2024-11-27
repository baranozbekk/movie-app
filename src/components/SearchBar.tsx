import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery, setPage } from '../redux/movieSlice';
import '../styles/components/SearchBar.scss';

const SearchBar: React.FC = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setQuery(input));
    dispatch(setPage(1));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
