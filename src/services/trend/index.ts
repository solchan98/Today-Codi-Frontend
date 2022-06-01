import { authApi } from '../axios';
import { IPostResponse } from 'types/trend';

export const getTrendPostList = async (lastId: number | undefined, sex = 2, ageRange = 'all') => {
  const postFix = lastId ? `&lastId=${lastId}` : '';
  const result = await authApi.get<IPostResponse[]>(
    `/trend?sex=${sex}&ageRange=${ageRange === '전체' ? 'all' : ageRange}${postFix}` // TODO: ageRange 비교 구문 더러워😵‍💫
  );
  return result.data;
};
