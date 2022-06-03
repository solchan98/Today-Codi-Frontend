import { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit';
import { getUserInfo, login } from '../thunk/userThunk';
import store from 'store';
import { authApi } from '../../services/axios';
import { WritableDraft } from 'immer/dist/internal';

interface CommonState {
  userId: number | undefined;
  nickname: string | undefined;
  profileImg: string | undefined;
  isLoggedIn: boolean;
}

export const userExtraReducers = (builder: ActionReducerMapBuilder<CommonState>) => {
  builder
    .addCase(login.pending, (state, action) => {
      console.log('pending');
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log('fulfilled');
      const { userId, nickname, profileImg, accessToken } = action.payload;
      setUserInfoByLogin(state, userId, nickname, profileImg);
      store.set('accessToken', accessToken);
      authApi.defaults.headers.common.Authorization = `Bearer ${action.payload.accessToken}`;
    })
    .addCase(login.rejected, (state, action) => {
      console.log('rejected');
      console.log(action.error); // TODO: 로그인 실패 시, 실패 이유 Popup 만들기
    })
    .addCase(getUserInfo.fulfilled, (state, action) => {
      console.log('fulfilled');
      const { userId, nickname, profileImg, accessToken } = action.payload;
      setUserInfoByLogin(state, userId, nickname, profileImg);
      store.set('accessToken', accessToken); // TODO: 토큰 접근 키 상수화 및 어떤 스토리지 사용할지 고민
      authApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    })
    .addCase(getUserInfo.rejected, (state, action) => {
      console.log('rejected');
      setInitUserInfo(state);
      console.log(action.error); // TODO: 로그인 실패 시, 실패 이유 Popup 만들기
    });
};

export const userReducers = () => {
  return {
    initUser: (state: WritableDraft<CommonState>, action: { payload: any; type: string }) => {
      setInitUserInfo(state);
      authApi.defaults.headers.common.authorization = '';
      store.remove('accessToken');
    },
  };
};

const setInitUserInfo = (state: Draft<CommonState>) => {
  state.userId = undefined;
  state.nickname = undefined;
  state.profileImg = undefined;
  state.isLoggedIn = false;
};

const setUserInfoByLogin = (state: Draft<CommonState>, userId: number, nickname: string, profileImg: string) => {
  state.userId = userId;
  state.nickname = nickname;
  state.profileImg = profileImg;
  state.isLoggedIn = true;
};
