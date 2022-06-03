import { createSlice } from '@reduxjs/toolkit';
import { userExtraReducers, userReducers } from '../../reducer/user';

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
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducers(),
  extraReducers: (builder) => userExtraReducers(builder),
});

export const { initUser } = userSlice.actions;
