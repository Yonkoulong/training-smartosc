import { http } from "./http";
import { IUser } from "@/types/users.type";

export async function getUsers() {
  	return http.get<IUser>("/users");
}

export async function getUserFollowToken(token: String) {
	return http.get<IUser>(`/users/${token}`);
}
