import api from "@/lib/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

type UseGetReturn<TResponse> = {
  data: TResponse | null;
  isLoading: boolean;
  error: AxiosError | null;
  refetch: (config?: AxiosRequestConfig) => Promise<TResponse>;
};

const useGet = <TResponse = unknown>(
  url: string,
  defaultConfig?: AxiosRequestConfig,
): UseGetReturn<TResponse> => {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const refetch = useCallback(
    async (config?: AxiosRequestConfig): Promise<TResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response: AxiosResponse<TResponse> = await api.get(url, {
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
    },
    [url, defaultConfig],
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGet;
