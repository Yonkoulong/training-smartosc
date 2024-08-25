import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "@/actions/auth.actions";
import { RootState } from "@/store";
import { UserCard } from "@/components/UserCard";

import classes from "./users.module.css";
import { IUser } from "@/types/users.type";

export function UsersPage() {
  	const users = useSelector((state: any) => state.users.users);
  	useFetchUsers();
	return (
		<div className={classes["pages-wrapper"]}>
		<section>
			<h1>This is User Pages</h1>
		</section>
		<section>
			<h4>All Users:</h4>
			<div className={classes["cards-wrapper"]}>
			{users &&
				users.length &&
				users.map((user: IUser) => {
				return <UserCard key={user.id} userData={user} />;
				})}
			</div>
		</section>
		</div>
	);
}

function useFetchUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);
}
