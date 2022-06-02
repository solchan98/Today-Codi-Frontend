import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTrendPostList } from '../../services/trend';
import { addHeart, removeHeart } from '../../services/post';

interface ISearchInfo {
  sex: string;
  ageRange: string;
  lastId: number | undefined;
}

interface IHeart {
  userId: number | undefined;
  postId: number;
}

export const getTrendThunk = createAsyncThunk('GET/TRENDPOST', async ({ sex, lastId, ageRange }: ISearchInfo) => {
  const res = await getTrendPostList(lastId, sex, ageRange);
  return res;
});

export const addHeartThunk = createAsyncThunk('PATCH/HEART', async ({ userId, postId }: IHeart): Promise<IHeart> => {
  addHeart(postId); // TODO: 일단 백엔드 성공 여부 논외로 좋아요 클릭 처리, 백엔드 리팩토링 작업 후 반영 예정
  return { userId, postId };
});

export const removeHeartThunk = createAsyncThunk(
  'DELETE/HEART',
  async ({ userId, postId }: IHeart): Promise<IHeart> => {
    removeHeart(postId);
    return { userId, postId };
  }
);
