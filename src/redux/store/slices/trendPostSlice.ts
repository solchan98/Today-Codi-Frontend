import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTrendPostList } from 'services/trend';
import { ITrendPostResponse } from 'types/trend';

interface CommonState {
  sex: number;
  ageRange: string;
  lastId: number | undefined;
  isLast: boolean;
  isLoading: boolean;
  trendPosts: ITrendPostResponse[];
}

const initialState: CommonState = {
  sex: 2,
  ageRange: 'all',
  lastId: undefined,
  isLast: false,
  isLoading: false,
  trendPosts: [] as ITrendPostResponse[],
};

interface ISearchInfo {
  sex: number;
  ageRange: string;
  lastId: number | undefined;
}

const getTrend = createAsyncThunk('GET/TRENDPOST', async ({ lastId, sex, ageRange }: ISearchInfo) => {
  const res = await getTrendPostList(lastId, sex, ageRange);
  return res;
});

export const trendPostSlice = createSlice({
  name: 'trendPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrend.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(getTrend.fulfilled, (state, action) => {
        console.log('fulfilled');
        state.isLast = action.payload.length === 0;
        state.lastId = action.payload.length !== 0 ? action.payload[action.payload.length - 1].postId : undefined;
        state.trendPosts = [...state.trendPosts, ...action.payload];
      })
      .addCase(getTrend.rejected, (state, action) => {
        console.log('rejected');
      });
  },
});

export default getTrend;
