import { api } from '../api';
import { SingleParam, IResponse } from './type';

/**
 * @description: 获取系统字典
 * @return {Promise}
 */
export const getDict = (params: SingleParam): Promise<IResponse> => {
 return api
  .post('systemDict', params)
  .then((res: any) => {
   console.log('请求返回总数据：', res);
   return res.data;
  })
  .catch((err: any) => {
   return err;
  });
};
