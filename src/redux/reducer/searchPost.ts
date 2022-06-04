import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { getFirstSearchPostThunk, getSearchPostThunk } from '../thunk/searchPostThunk';
import { IPostThumbnailResponse } from 'types/post';
import { addHeartThunk, removeHeartThunk } from '../thunk/trendPostThunk';

interface CommonState {
  lastId: number | undefined;
  isLast: boolean;
  isLoading: boolean;
  searchPosts: IPostThumbnailResponse[];
}

// TODO: thunk 케이스 별로 구분하고싶은데,, 좀 더 고민해볼예정!
export const searchPostExtraReducers = (builder: ActionReducerMapBuilder<CommonState>) => {
  builder
    .addCase(getFirstSearchPostThunk.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getFirstSearchPostThunk.fulfilled, (state, action) => {
      state.isLast = action.payload.length === 0;
      state.lastId = action.payload.length !== 0 ? action.payload[action.payload.length - 1].postId : undefined;
      state.searchPosts = action.payload;
      state.isLoading = false;
    })
    .addCase(getSearchPostThunk.pending, (state, action) => {})
    .addCase(getSearchPostThunk.fulfilled, (state, action) => {
      state.isLast = action.payload.length === 0;
      state.lastId = action.payload.length !== 0 ? action.payload[action.payload.length - 1].postId : undefined;
      state.searchPosts = [...state.searchPosts, ...action.payload];
    })
    .addCase(addHeartThunk.fulfilled, (state, action) => {
      state.searchPosts = state.searchPosts.map((post) => {
        if (post.postId === action.payload.postId) {
          post.likeCnt += 1;
          post.isLike = true;
        }
        return post;
      });
    })
    .addCase(removeHeartThunk.fulfilled, (state, action) => {
      state.searchPosts = state.searchPosts.map((post) => {
        if (post.postId === action.payload.postId) {
          post.likeCnt -= 1;
          post.isLike = false;
        }
        return post;
      });
    });
  return builder;
};
