import store from 'store';
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = String(process.env.REACT_APP_BASE_URL);

const axiosApi = (url: string, options?: AxiosRequestConfig) => axios.create({ baseURL: url, ...options });

const axiosAuthApi = (url: string, option?: AxiosRequestConfig) => {
  const { accessToken } = store.get(String(process.env.REACT_APP_LOCAL_USER_KEY)) || '';
  return axios.create({
    baseURL: url,
    headers: {
      accessToken: `Bearer ${accessToken}`,
    },
    ...option,
  });
};

export const basicApi = axiosApi(BASE_URL);
export const authApi = axiosAuthApi(BASE_URL);
