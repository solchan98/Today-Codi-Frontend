import { createSlice } from '@reduxjs/toolkit';

import { IPostThumbnailResponse } from 'types/post';
import { followingPostExtraReducers } from '../../reducer/followingPost';

interface CommonState {
  lastId: number | undefined;
  isLast: boolean;
  isLoading: boolean;
  followingPosts: IPostThumbnailResponse[];
}

const initialState: CommonState = {
  lastId: undefined,
  isLast: false,
  isLoading: false,
  followingPosts: [] as IPostThumbnailResponse[],
};

export const followingPostSlice = createSlice({
  name: 'followingPostSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => followingPostExtraReducers(builder),
});
