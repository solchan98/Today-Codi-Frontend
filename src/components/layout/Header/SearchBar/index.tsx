import cs from './searchBar.module.scss';
import { SearchIcon } from '../../../../assets/svgs';

const SearchBar = () => {
  return (
    <div className={cs.searchBarWrapper}>
      <form>
        <input type='text' placeholder='오늘의 코디 통합검색' />
      </form>
      <SearchIcon className={cs.svg} />
    </div>
  );
};

export default SearchBar;
