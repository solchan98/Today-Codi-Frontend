import { basicApi } from '../axios';
// eslint-disable-next-line import/extensions
import { ITrendPostList, ITrendPostResponse } from '../../types/trend';

export const getTrendPostList = async ({ sex = 2, ageRange = 'all' }, pageParam = 0) => {
  const result = await basicApi.get<ITrendPostResponse[]>(`/trend?sex=${sex}&ageRange=${ageRange}&page=${pageParam}`);
  return {
    data: result.data,
    nextPage: result.data.length === 0 ? null : pageParam + 1,
  } as ITrendPostList;
};
