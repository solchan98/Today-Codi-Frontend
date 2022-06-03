import { createSlice } from '@reduxjs/toolkit';

import { IPostThumbnailResponse } from 'types/post';
import { trendPostExtraReducers, trendPostReducers } from '../../reducer/trendPost';

interface CommonState {
  sex: string;
  ageRange: string;
  lastId: number | undefined;
  isLast: boolean;
  isLoading: boolean;
  trendPosts: IPostThumbnailResponse[];
}

const initialState: CommonState = {
  sex: '전체',
  ageRange: '전체',
  lastId: undefined,
  isLast: false,
  isLoading: false,
  trendPosts: [] as IPostThumbnailResponse[],
};

export const trendPostSlice = createSlice({
  name: 'trendPost',
  initialState,
  reducers: trendPostReducers(),
  extraReducers: (builder) => trendPostExtraReducers(builder),
});

export const { changeSexCondition, changeAgeRangeCondition } = trendPostSlice.actions;
