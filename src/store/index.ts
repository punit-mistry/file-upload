import { atom } from "recoil";

 export const ImgLinkArray = atom({
  key: 'ImgLinkArray',
  default: [],
});
 export const userData = atom({
  key: 'currentUserData',
  default: [],
});
 export const userToken = atom({
  key: 'currentUserToken',
  default: 0,
});