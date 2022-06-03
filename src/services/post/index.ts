import { authApi } from '../axios';

export const getPost = async (postId: number) => {
  const res = await authApi.get(`/post?postId=${postId}`);
  return res.data;
};

export const addHeart = (postId: number) => {
  authApi.patch(`/post/like?postId=${postId}`);
};

export const removeHeart = (postId: number) => {
  authApi.delete(`/post/like?postId=${postId}`);
};

export const createPost = async (newPostData: FormData) => {
  const res = await authApi.post('/post', newPostData);
  return res.data;
};
