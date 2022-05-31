import { atom } from 'recoil';
// eslint-disable-next-line import/extensions
import { ITrendSearchState } from '../../types/trend';

const TREND_POST_SEARCH_INIT_STATE: ITrendSearchState = {
  sex: 2,
  ageRange: 'all',
};

export const trendPostSearchState = atom<ITrendSearchState>({
  key: '#trendPostSearchState',
  default: TREND_POST_SEARCH_INIT_STATE,
});
