import { api } from "../../api/api";
import type { User } from "../../types";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data
}