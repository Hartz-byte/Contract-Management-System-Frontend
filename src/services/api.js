import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const contractService = {
  // get all contracts
  async getContracts(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/contracts?${params}`);
    return response.data;
  },

  // upload contract
  async uploadContract(data) {
    const response = await api.post("/contracts", data);
    return response.data;
  },

  // update contract
  async updateContract(id, data) {
    const response = await api.put(`/contracts/${id}`, data);
    return response.data;
  },

  // delete contract
  async deleteContract(id) {
    await api.delete(`/contracts/${id}`);
  },
};

export default api;
