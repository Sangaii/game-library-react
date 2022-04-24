import { IResponse, ILogin } from './type';
import { api } from '../api';
/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
export const login = (params: ILogin): Promise<IResponse> => {
 return api
  .post('user/login', params)
  .then((res: any) => res.data)
  .catch((err: any) => {
   return err;
  });
};

/**
 * @description: 用户注册
 * @params {ILogin} params
 * @return {Promise}
 */
export const register = (params: ILogin): Promise<IResponse> => {
 return api
  .post('user/register', params)
  .then((res: any) => res.data)
  .catch((err: any) => {
   return err;
  });
};
