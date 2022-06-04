import { authApi } from '../axios';
import { IPostThumbnailResponse } from 'types/post';

export const newComment = async (postId: number, content: string) => {
  const res = await authApi.post(`/post/comment?postId=${postId}`, {
    content,
  });
  return res.data;
};

export const getPost = async (postId: number) => {
  const res = await authApi.get(`/post?postId=${postId}`);
  return res.data;
};

// 좋아요 추가 및 취소는 일반적으로 응답받지 않고 반영!
// 보통 서버에서 메시지 큐 방식으로 구현하기 때문, But 이번 서버에서는 그렇게 하지 않았음.
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

export const getFollowingPostList = async (lastId: number | undefined) => {
  const postFix = lastId ? `?&lastId=${lastId}` : '';
  const result = await authApi.get<IPostThumbnailResponse[]>(`/following${postFix}`);
  return result.data;
};
