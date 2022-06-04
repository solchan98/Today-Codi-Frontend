import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';

import { SearchIcon } from 'assets/svgs';
import { useAppDispatch } from 'redux/store';
import { getFirstSearchPostThunk } from 'redux/thunk/searchPostThunk';

import cs from './searchBar.module.scss';

const SearchBar = () => {
  const [value, setValue] = useState('');

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value !== '') {
      const tagName = value[0] === '#' ? value.slice(1) : value;
      dispatch(getFirstSearchPostThunk(tagName));
      nav(`/search?tagName=${tagName}`);
    }
  };

  const nav = useNavigate();
  return (
    <div className={cs.searchBarWrapper}>
      <form onSubmit={onSubmit}>
        <input value={value} type='text' placeholder='오늘의 코디 태그검색' onChange={onChangeValue} />
      </form>
      <SearchIcon className={cs.svg} />
    </div>
  );
};

export default SearchBar;
