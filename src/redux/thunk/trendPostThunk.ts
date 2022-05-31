import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTrendPostList } from '../../services/trend';

interface ISearchInfo {
  sex: number;
  ageRange: string;
  lastId: number | undefined;
}

export const getTrend = createAsyncThunk('GET/TRENDPOST', async ({ lastId, sex, ageRange }: ISearchInfo) => {
  const res = await getTrendPostList(lastId, sex, ageRange);
  return res;
});
