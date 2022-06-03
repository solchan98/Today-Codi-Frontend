import { IUser } from 'user';

export interface IPostThumbnailResponse {
  user: {
    nickname: string;
    profileImg: string;
  };
  mainImg: string;
  postId: number;
  createdAt: Date;
  isLike: boolean;
  likeCnt: number;
  commentCnt: number;
}

export interface IPostResponse {
  user: IUser;
  postId: number;
  content: string;
  mainImg: string;
  sex: string;
  ageRange: string;
  createdAt: Date;
  commentList: IComment[];
  tagList: ITag[];
  likeUserIdList: number[];
  markerList: IMarker[];
  isFollowing: boolean;
  likeIt: boolean;
}

interface IComment {
  commentId: number;
  userNickname: string;
  profileImg: string;
  content: string;
  createdAt: Date;
}

interface ITag {
  tagId: number;
  title: string;
}

interface IMarker {
  name?: string;
  marker: number; // markerId
  width: number;
  height: number;
  link: string;
}
