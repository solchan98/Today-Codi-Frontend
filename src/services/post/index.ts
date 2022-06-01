import { authApi } from '../axios';

export const getPost = async (postId: number) => {
  const res = await authApi.get(`/post?postId=${postId}`);
  return res.data;
};
