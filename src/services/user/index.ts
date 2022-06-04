import { authApi, basicApi } from '../axios';

export const addFollowing = (userId: number) => {
  authApi.post(`/auth/follow?userId=${userId}`);
};

export const removeFollowing = (userId: number) => {
  authApi.delete(`/auth/follow?userId=${userId}`);
};

export const loginAPI = (name: string, password: string) => {
  return basicApi
    .post('/auth/login', {
      name,
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
