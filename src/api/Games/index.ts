import { api } from '../api';
import { ILogin, IResponse } from './type';

/**
 * @description: 查询游戏列表
 * @return {Promise}
 */
export const games = (): Promise<IResponse> => {
 return api
  .get('games')
  .then((res: any) => {
   console.log('请求返回总数据：', res);
   return res.data;
  })
  .catch((err: any) => {
   return err;
  });
};
