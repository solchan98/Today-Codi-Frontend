import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFollowingPostList } from 'services/post';

export const getFollowingPostThunk = createAsyncThunk('GET/FOLLOWING_POST_LIST', async (lastId: number | undefined) => {
  const res = await getFollowingPostList(lastId);
  return res;
});
