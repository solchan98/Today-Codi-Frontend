import store from 'store';
import { createSlice, Draft } from '@reduxjs/toolkit';
import { getUserInfo, login } from '../../thunk/userThunk';

interface CommonState {
  userId: number | undefined;
  nickname: string | undefined;
  profileImg: string | undefined;
  isLoggedIn: boolean;
}

const initialState: CommonState = {
  userId: undefined,
  nickname: undefined,
  profileImg: undefined,
  isLoggedIn: false, // TODO: 토큰 접근 키 상수화 및 어떤 스토리지 사용할지 고민
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // TODO: extraReducers를 따로 빼서 작업하는 것도 고려중
    builder
      .addCase(login.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('fulfilled');
        const { userId, nickname, profileImg } = action.payload;
        setUserInfoByLogin(state, userId, nickname, profileImg);
        store.set('accessToken', action.payload.accessToken); // TODO: 토큰 접근 키 상수화 및 어떤 스토리지 사용할지 고민
      })
      .addCase(login.rejected, (state, action) => {
        console.log('rejected');
        console.log(action.error); // TODO: 로그인 실패 시, 실패 이유 Popup 만들기
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        console.log('fulfilled');
        const { userId, nickname, profileImg } = action.payload;
        setUserInfoByLogin(state, userId, nickname, profileImg);
        store.set('accessToken', action.payload.accessToken); // TODO: 토큰 접근 키 상수화 및 어떤 스토리지 사용할지 고민
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        console.log('rejected');
        setInitUserInfo(state);
        console.log(action.error); // TODO: 로그인 실패 시, 실패 이유 Popup 만들기
      });
  },
});

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
