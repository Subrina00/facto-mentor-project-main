import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpService } from "../httpService";
import type { User } from "~/types/user";

const USER_ENDPOINTS = {
  ALL_USER: "/user/get-all",
  USER: "/user",
  CREATE_USER: "/user/create",
  UPDATE_USER: "/user/update",
  DELETE_USER: "/user",
} as const;

export const userService = {
  getUsers: () => httpService.get<User[]>(USER_ENDPOINTS.ALL_USER),
  getUserById: (id: number) =>
    httpService.get<User>(`${USER_ENDPOINTS.USER}/${id}`),
  createUser: (user: Omit<User, "id">) =>
    httpService.post<User>(`${USER_ENDPOINTS.CREATE_USER}`, user),
  updateUser: (id: number, user: Partial<User>) =>
    httpService.put<User>(`${USER_ENDPOINTS.UPDATE_USER}/${id}`, user),
  deleteUser: (id: number) =>
    httpService.delete(`${USER_ENDPOINTS.DELETE_USER}/${id}`),
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getUsers();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
