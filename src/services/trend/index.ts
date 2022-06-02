import { authApi } from '../axios';
import { IPostResponse } from 'types/trend';

export const getTrendPostList = async (lastId: number | undefined, sex = '전체', ageRange = 'all') => {
  const postFix = lastId ? `&lastId=${lastId}` : '';
  // eslint-disable-next-line no-nested-ternary
  const sexIndex = sex === '전체' ? 2 : sex === '남' ? 0 : 1; // TODO: nested....
  const result = await authApi.get<IPostResponse[]>(
    `/trend?sex=${sexIndex}&ageRange=${ageRange === '전체' ? 'all' : ageRange}${postFix}` // TODO: ageRange 비교 구문 더러워😵‍💫
  );
  return result.data;
};
