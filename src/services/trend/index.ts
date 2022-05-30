import { basicApi } from '../axios';
// eslint-disable-next-line import/extensions
import { ITrendSearchState } from '../../types/trend';

export const getTrendPostList = ({ sex, ageRange, page }: ITrendSearchState) => {
  return basicApi.get(`/trend?sex=${sex}&ageRange=${ageRange}&page=${page}`);
};
