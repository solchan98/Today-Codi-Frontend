import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfoAPI, loginAPI } from '../../services/user';

interface ILoginRequest {
  name: string;
  password: string;
}

export const login = createAsyncThunk('POST/LOGIN', ({ name, password }: ILoginRequest) => {
  return loginAPI(name, password)
    .then((res) => res)
    .catch((err) => {
      throw Error(err);
    });
});

export const getUserInfo = createAsyncThunk('GET/GETUSERINFO', (accessToken: string) => {
  return getUserInfoAPI(accessToken)
    .then((res) => res)
    .catch((err) => {
      throw Error(err);
    });
});
