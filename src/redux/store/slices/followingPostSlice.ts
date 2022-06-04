import { createSlice } from '@reduxjs/toolkit';

import { IPostThumbnailResponse } from 'types/post';
import { followingPostExtraReducers, followingPostReducers } from '../../reducer/followingPost';

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
  reducers: followingPostReducers(),
  extraReducers: (builder) => followingPostExtraReducers(builder),
});

export const { initFollowingPostState } = followingPostSlice.actions;
