import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Fetch Wrapper Hook
const useFetch = (key, url, options = {}) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data;
    },
    ...options,
  });

  return { data, error, isLoading, isFetching, refetch };
};

// Mutation Wrapper Hook
const usePost = (url, successCallback) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post(url, payload);
      return data;
    },
    onSuccess: () => {
      successCallback && successCallback();
      queryClient.invalidateQueries(); // Refetch queries
    },
    onError: (error) => {
      console.error('Error:', error.message);
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isLoading, isError: mutation.isError };
};

export { useFetch, usePost };
