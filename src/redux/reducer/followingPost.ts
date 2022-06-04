import { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit';

import { IPostThumbnailResponse } from 'types/post';
import { addHeartThunk, removeHeartThunk } from '../thunk/trendPostThunk';
import { getFollowingPostThunk } from '../thunk/followingPostThunk';
import { WritableDraft } from 'immer/dist/internal';

interface CommonState {
  lastId: number | undefined;
  isLast: boolean;
  isLoading: boolean;
  followingPosts: IPostThumbnailResponse[];
}

// TODO: thunk 케이스 별로 구분하고싶은데,, 좀 더 고민해볼예정!
export const followingPostExtraReducers = (builder: ActionReducerMapBuilder<CommonState>) => {
  builder
    .addCase(getFollowingPostThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getFollowingPostThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLast = action.payload.length === 0;
      state.lastId = action.payload.length !== 0 ? action.payload[action.payload.length - 1].postId : undefined;
      state.followingPosts = [...state.followingPosts, ...action.payload];
    })
    .addCase(addHeartThunk.fulfilled, (state, action) => {
      state.followingPosts = state.followingPosts.map((post) => {
        if (post.postId === action.payload.postId) {
          post.likeCnt += 1;
          post.isLike = true;
        }
        return post;
      });
    })
    .addCase(removeHeartThunk.fulfilled, (state, action) => {
      state.followingPosts = state.followingPosts.map((post) => {
        if (post.postId === action.payload.postId) {
          post.likeCnt -= 1;
          post.isLike = false;
        }
        return post;
      });
    });
  return builder;
};

export const followingPostReducers = () => {
  return {
    initFollowingPostState: (state: WritableDraft<CommonState>) => {
      setInitPostsAndLast(state);
    },
  };
};

const setInitPostsAndLast = (state: Draft<CommonState>) => {
  state.followingPosts = [];
  state.lastId = undefined;
  state.isLast = false;
};
