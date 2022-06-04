import { createSlice } from '@reduxjs/toolkit';

import { IPostThumbnailResponse } from 'types/post';
import { searchPostExtraReducers } from '../../reducer/searchPost';

interface CommonState {
  lastId: number | undefined;
  isLast: boolean;
  isLoading: boolean;
  searchPosts: IPostThumbnailResponse[];
}

const initialState: CommonState = {
  lastId: undefined,
  isLast: false,
  isLoading: false,
  searchPosts: [] as IPostThumbnailResponse[],
};

export const searchPostSlice = createSlice({
  name: 'searchPostSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => searchPostExtraReducers(builder),
});
