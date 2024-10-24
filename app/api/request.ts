import { type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

export type QueryOptions<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryFn' | 'queryKey'
>;

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
});

export default request;
