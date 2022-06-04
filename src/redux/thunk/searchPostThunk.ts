import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSearchPostListByTag } from 'services/post';

interface Props {
  tagName: string;
  lastId: number | undefined;
}

export const getSearchPostThunk = createAsyncThunk('GET/SEARCH_POST_LIST', async ({ tagName, lastId }: Props) => {
  const res = await getSearchPostListByTag(tagName, lastId);
  return res;
});

export const getFirstSearchPostThunk = createAsyncThunk('GET/SEARCH_FIRST_POST_LIST', async (tagName: string) => {
  const res = await getSearchPostListByTag(tagName, undefined);
  return res;
});
