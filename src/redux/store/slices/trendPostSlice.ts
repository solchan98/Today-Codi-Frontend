import { createSlice, Draft } from '@reduxjs/toolkit';

import { IPostResponse } from 'types/trend';
import { addHeartThunk, getTrendThunk, removeHeartThunk } from '../../thunk/trendPostThunk';

interface CommonState {
  sex: number;
  ageRange: string;
  lastId: number | undefined;
  isLast: boolean;
  isLoading: boolean;
  trendPosts: IPostResponse[];
}

const initialState: CommonState = {
  sex: 2,
  ageRange: '전체',
  lastId: undefined,
  isLast: false,
  isLoading: false,
  trendPosts: [] as IPostResponse[],
};

export const trendPostSlice = createSlice({
  name: 'trendPost',
  initialState,
  reducers: {
    // TODO: reducer를 따로 빼서 작업하는 것도 고려중
    changeSexCondition: (state, action) => {
      const { value } = action.payload;
      setInitPostsAndLast(state);
      // eslint-disable-next-line no-nested-ternary
      state.sex = value === '전체' ? 2 : value === '남' ? 0 : 1; // TODO: If 문으로 빼자니.. 너무 길어지고.. 메서드로 빼자니 관심사 분리가 애매하고..
      getTrendThunk({ lastId: state.lastId, sex: state.sex, ageRange: state.ageRange });
    },
    changeAgeRangeCondition: (state, action) => {
      setInitPostsAndLast(state);
      state.ageRange = action.payload.value;
      getTrendThunk({ lastId: state.lastId, sex: state.sex, ageRange: state.ageRange });
    },
  },
  extraReducers: (builder) => {
    // TODO: extraReducers를 따로 빼서 작업하는 것도 고려중
    builder
      .addCase(getTrendThunk.pending, (state, action) => {})
      .addCase(getTrendThunk.fulfilled, (state, action) => {
        state.isLast = action.payload.length === 0;
        state.lastId = action.payload.length !== 0 ? action.payload[action.payload.length - 1].postId : undefined;
        state.trendPosts = [...state.trendPosts, ...action.payload];
      })
      .addCase(addHeartThunk.fulfilled, (state, action) => {
        const { userId, postId } = action.payload;
        state.trendPosts = state.trendPosts.map((post) => {
          if (post.postId === postId) {
            post.likeUserIdList.push(Number(userId));
            post.likeIt = true;
          }
          return post;
        });
      })
      .addCase(removeHeartThunk.fulfilled, (state, action) => {
        const { userId, postId } = action.payload;
        state.trendPosts = state.trendPosts.map((post) => {
          if (post.postId === postId) {
            const userIndex = post.likeUserIdList.indexOf(Number(userId));
            post.likeUserIdList.splice(userIndex, 1);
            post.likeIt = false;
          }
          return post;
        });
      });
  },
});

const setInitPostsAndLast = (state: Draft<CommonState>) => {
  state.trendPosts = [];
  state.lastId = undefined;
  state.isLast = false;
};

export const { changeSexCondition, changeAgeRangeCondition } = trendPostSlice.actions;
