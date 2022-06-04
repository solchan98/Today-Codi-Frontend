import { authApi, basicApi } from '../axios';
import { ISignUp } from 'types/user';

export const signUp = async (userInfo: ISignUp) => {
  basicApi.post(`/auth/sign-up`, userInfo).catch((err) => {
    throw Error(err.response.data.message);
  });
};

export const checkDuplicateUserId = async (userStringId: string) => {
  const res = await basicApi.get(`/auth/user-id?stringId=${userStringId}`);
  return res.data;
};

export const addFollowing = (userId: number) => {
  authApi.post(`/auth/follow?userId=${userId}`);
};

export const removeFollowing = (userId: number) => {
  authApi.delete(`/auth/follow?userId=${userId}`);
};

export const loginAPI = (stringId: string, password: string) => {
  return basicApi
    .post('/auth/login', {
      stringId,
      password,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw Error(err.response.data.message);
    });
};

export const getUserInfoAPI = (accessToken: string) => {
  return authApi
    .get('/auth/user', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw Error(err.response.data.message);
    });
};
