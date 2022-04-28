import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { showMessage } from './status';
import { message } from 'antd';

export let api: AxiosInstance = axios.create({
 //  baseURL: 'http://localhost:3003',
 baseURL: process.env.BASE_URL,
 headers: {
  Accept: 'application/json',
  // 'Content-Type': 'application/x-www-form-urlencoded',
 },
 //  transformRequest: [
 //   function (data) {
 //    //由于使用的 form-data传数据所以要格式化
 //    delete data.Authorization;
 //    return data;
 //   },
 //  ],
});

// axios实例拦截响应
api.interceptors.response.use(
 (response: AxiosResponse) => {
  if (response.headers.authorization) {
   localStorage.setItem('token', response.headers.authorization);
  } else {
   if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
   }
  }

  if (response.status === 200) {
   return response;
  } else {
   message.warning(showMessage(response.status));
   return response;
  }
 },
 // 请求失败
 (error: any) => {
  const { response } = error;
  if (response) {
   // 请求已发出，但是不在2xx的范围
   showMessage(response.status);
   return Promise.reject(response.data);
  } else {
   message.warning('网络连接异常,请稍后再试!');
  }
 }
);

// axios实例拦截请求
api.interceptors.request.use(
 (config: AxiosRequestConfig) => {
  // const { user } = store.state
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config;
 },
 (error: any) => {
  debugger;
  return Promise.reject(error);
 }
);
