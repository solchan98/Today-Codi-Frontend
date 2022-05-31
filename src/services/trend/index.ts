import { basicApi } from '../axios';
import { ITrendPostResponse } from 'types/trend';

export const getTrendPostList = async (lastId: number | undefined, sex = 2, ageRange = 'all') => {
  const postFix = lastId ? `&lastId=${lastId}` : '';
  const result = await basicApi.get<ITrendPostResponse[]>(`/trend?sex=${sex}&ageRange=${ageRange}${postFix}`);
  return result.data;
};
