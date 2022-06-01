export interface IPostResponse {
  user: IUser;
  postId: number;
  content: string;
  mainImg: string;
  sex: number;
  ageRange: string;
  createdAt: Date;
  commentList: IComment[];
  tagList: ITag[];
  likeUserIdList: number[];
  markerList: IMarker[];
  isFollowing: boolean;
}

interface IUser {
  userId: number;
  nickname: string;
  profileImg: string;
  createdAt: Date;
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
  marker: number;
  width: number;
  height: number;
  link: string;
}
