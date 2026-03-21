import axios from "axios";

const API_BASE = "http://localhost:8085/api";
const getToken = () => localStorage.getItem("token");

export const userUseCase = {
  getUsers: async (type: "clients" | "employees") => {
    const res = await axios.get(`${API_BASE}/${type}`, { headers: { Authorization: `Bearer ${getToken()}` } });
    return res.data;
  },

  getUserById: async (type: "clients" | "employees", id: string) => {
    const res = await axios.get(`${API_BASE}/${type}/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
    return res.data;
  },

  createUser: async (type: "clients" | "employees", user: any) => {
    const res = await axios.post(`${API_BASE}/${type}`, user, { headers: { Authorization: `Bearer ${getToken()}` } });
    return res.data;
  },

  updateUser: async (type: "clients" | "employees", id: string, user: any) => {
    const res = await axios.put(`${API_BASE}/${type}/${id}`, user, { headers: { Authorization: `Bearer ${getToken()}` } });
    return res.data;
  },

  deleteUser: async (type: "clients" | "employees", id: string) => {
    const res = await axios.delete(`${API_BASE}/${type}/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
    return res.data;
  },

  toggleLock: async (type: "clients" | "employees", id: string, status: string) => {
    const newStatus = status === "LOCKED" ? "unlock" : "lock";
    const res = await axios.put(`${API_BASE}/${type}/${id}/${newStatus}`, { status: newStatus }, { headers: { Authorization: `Bearer ${getToken()}` } });
    return res.data;
  },
};