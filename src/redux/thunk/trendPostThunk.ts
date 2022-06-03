import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTrendPostList, addHeart, createPost, removeHeart } from 'services/post';

interface ISearchInfo {
  sex: string;
  ageRange: string;
  lastId: number | undefined;
}

interface IHeart {
  userId: number | undefined;
  postId: number;
}

export const getTrendThunk = createAsyncThunk('GET/TREND_POST', async ({ sex, lastId, ageRange }: ISearchInfo) => {
  const res = await getTrendPostList(lastId, sex, ageRange);
  return res;
});

export const addHeartThunk = createAsyncThunk('PATCH/HEART', async ({ userId, postId }: IHeart): Promise<IHeart> => {
  addHeart(postId);
  return { userId, postId };
});

export const removeHeartThunk = createAsyncThunk(
  'DELETE/HEART',
  async ({ userId, postId }: IHeart): Promise<IHeart> => {
    removeHeart(postId);
    return { userId, postId };
  }
);

export const createPostThunk = createAsyncThunk('POST/CREATE_POST', (newPostData: FormData) => {
  return createPost(newPostData).then((res) => res);
});
