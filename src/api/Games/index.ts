import { api } from '../api';
import { ILogin, IResponse } from './type';

/**
 * @description: 查询游戏列表
 * @return {Promise}
 */
export const games = (params: any): Promise<IResponse> => {
 return api
  .get('game', { params: params })
  .then((res: any) => {
   console.log('请求返回总数据：', res);
   return res.data;
  })
  .catch((err: any) => {
   return err;
  });
};

/**
 * @description: 添加游戏
 * @return {Promise}
 */
export const addGame = (data: any): Promise<IResponse> => {
 return api
  .post('game', data)
  .then((res: any) => {
   console.log('请求返回总数据：', res);
   return res.data;
  })
  .catch((err: any) => {
   return err;
  });
};

/**
 * @description: 修改游戏
 * @return {Promise}
 */
export const editGame = (data: any): Promise<IResponse> => {
 return api
  .put('game', data)
  .then((res: any) => {
   console.log('请求返回总数据：', res);
   return res.data;
  })
  .catch((err: any) => {
   return err;
  });
};

/**
 * @description: 删除游戏
 * @return {Promise}
 */
export const deleteGame = (params: any): Promise<IResponse> => {
 return api
  .delete('game', { params: params })
  .then((res: any) => {
   console.log('请求返回总数据：', res);
   return res.data;
  })
  .catch((err: any) => {
   return err;
  });
};
