import { atom } from 'recoil';
import { IPostResponse } from 'types/post';

export const postState = atom({
  key: '#postState',
  default: {} as IPostResponse,
});
