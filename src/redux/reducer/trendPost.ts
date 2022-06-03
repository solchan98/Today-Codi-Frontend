import { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit';

import { IPostThumbnailResponse } from 'types/post';
import { addHeartThunk, createPostThunk, getTrendThunk, removeHeartThunk } from '../thunk/trendPostThunk';
import { WritableDraft } from 'immer/dist/internal';

interface CommonState {
  sex: string;
  ageRange: string;
  lastId: number | undefined;
  isLast: boolean;
  isLoading: boolean;
  trendPosts: IPostThumbnailResponse[];
}

// TODO: thunk 케이스 별로 구분하고싶은데,, 좀 더 고민해볼예정!
export const trendPostExtraReducers = (builder: ActionReducerMapBuilder<CommonState>) => {
  builder
    .addCase(getTrendThunk.pending, (state, action) => {})
    .addCase(getTrendThunk.fulfilled, (state, action) => {
      state.isLast = action.payload.length === 0;
      state.lastId = action.payload.length !== 0 ? action.payload[action.payload.length - 1].postId : undefined;
      state.trendPosts = [...state.trendPosts, ...action.payload];
    })
    .addCase(addHeartThunk.fulfilled, (state, action) => {
      state.trendPosts = state.trendPosts.map((post) => {
        if (post.postId === action.payload.postId) {
          post.likeCnt += 1;
          post.isLike = true;
        }
        return post;
      });
    })
    .addCase(removeHeartThunk.fulfilled, (state, action) => {
      state.trendPosts = state.trendPosts.map((post) => {
        if (post.postId === action.payload.postId) {
          post.likeCnt -= 1;
          post.isLike = false;
        }
        return post;
      });
    })
    .addCase(createPostThunk.pending, (state, action) => {})
    .addCase(createPostThunk.fulfilled, (state, action) => {
      action.payload.likeCnt = 0;
      action.payload.commentCnt = 0;
      state.trendPosts = [action.payload, ...state.trendPosts];
    });
  return builder;
};

export const trendPostReducers = () => {
  return {
    changeSexCondition: (state: WritableDraft<CommonState>, action: { payload: any; type: string }) => {
      setInitPostsAndLast(state);
      state.sex = action.payload;
      getTrendThunk({ lastId: state.lastId, sex: state.sex, ageRange: state.ageRange });
    },
    changeAgeRangeCondition: (state: WritableDraft<CommonState>, action: { payload: any; type: string }) => {
      setInitPostsAndLast(state);
      state.ageRange = action.payload;
      getTrendThunk({ lastId: state.lastId, sex: state.sex, ageRange: state.ageRange });
    },
  };
};

const setInitPostsAndLast = (state: Draft<CommonState>) => {
  state.trendPosts = [];
  state.lastId = undefined;
  state.isLast = false;
};
