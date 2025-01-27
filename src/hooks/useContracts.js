import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// use contract
export function useContracts(filters = {}) {
  return useQuery({
    queryKey: ["contracts", filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const { data } = await axios.get(`${API_URL}/contracts?${params}`);
      return data;
    },
  });
}

// upload contract
export function useUploadContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contractData) => {
      const { data } = await axios.post(`${API_URL}/contracts`, contractData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("contracts");
    },
  });
}

// update contract
export function useUpdateContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { data } = await axios.put(`${API_URL}/contracts/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("contracts");
    },
  });
}

// delete contract
export function useDeleteContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/contracts/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("contracts");
    },
  });
}
