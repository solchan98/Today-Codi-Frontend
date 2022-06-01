import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = String(process.env.REACT_APP_BASE_URL);

const axiosApi = (url: string, options?: AxiosRequestConfig) => axios.create({ baseURL: url, ...options });

const axiosAuthApi = (url: string, option?: AxiosRequestConfig) => {
  return axios.create({
    baseURL: url,
    ...option,
  });
};

export const basicApi = axiosApi(BASE_URL);
export const authApi = axiosAuthApi(BASE_URL);
