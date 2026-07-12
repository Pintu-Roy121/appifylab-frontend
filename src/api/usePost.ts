import api from "@/lib/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

type UsePostReturn<TResponse, TPayload> = {
  data: TResponse | null;
  isLoading: boolean;
  error: AxiosError | null;
  trigger: (
    payload: TPayload,
    config?: AxiosRequestConfig,
  ) => Promise<TResponse>;
};

const usePost = <TResponse = unknown, TPayload = unknown>(
  url: string,
  defaultConfig?: AxiosRequestConfig,
): UsePostReturn<TResponse, TPayload> => {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const trigger = async (
    payload: TPayload,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<TResponse> = await api.post(url, payload, {
        ...defaultConfig,
        ...config,
        headers: {
          ...defaultConfig?.headers,
          ...config?.headers,
        },
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      throw axiosError;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    trigger,
  };
};

export default usePost;
