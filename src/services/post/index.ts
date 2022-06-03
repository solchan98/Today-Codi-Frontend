import { authApi } from '../axios';
import { IPostThumbnailResponse } from 'types/post';

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

export const getTrendPostList = async (lastId: number | undefined, sex = '전체', ageRange = '전체') => {
  const postFix = lastId ? `&lastId=${lastId}` : '';
  const result = await authApi.get<IPostThumbnailResponse[]>(`/trend?sex=${sex}&ageRange=${ageRange}${postFix}`);
  return result.data;
};
