export interface IUser {
  userId: number;
  nickname: string;
  profileImg: string;
  createdAt: Date;
}

export interface ISignUp {
  stringId: string;
  nickname: string;
  password: string;
}
