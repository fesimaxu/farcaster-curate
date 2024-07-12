import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export async function makeServiceRequest<T>(
  path: string,
  method: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const baseUrl = process.env.baseURL;

  const url = `${baseUrl}${path}`;

  const response: AxiosResponse<T> = await axios.request({
    url,
    method,
    data,
    ...config,
  });
  return response.data;
}