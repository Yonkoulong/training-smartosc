import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { UsersPage } from "@/pages/users";
import { NotFoundPage } from "@/pages/404";
import { CounterPage } from "@/pages/counter";
import { HomePage } from "@/pages/home";
import  { ReservationPage }  from "@/pages/reservation";
import { ReservationListPage } from "@/pages/reservationList";
import { AuthPage } from "@/pages/auth";
import { AdminPage } from "@/pages/admin/adminPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnums } from "@/actions/appEnums.action";
import { validateAccessToken } from "@/actions/token.actions";
import { RootState } from "@/store";


interface localToken {
  	accessToken: string;
}

function App() {
	const dispatch = useDispatch();
	const enums = useSelector((state: RootState) => {
		return state.appEnums;
	});

	useEffect(() => {
		dispatch(fetchEnums());
		const localToken:localToken = JSON.parse(localStorage.getItem("token")|| '{}');
		if (!localToken) {
			return;
		}		
		dispatch(validateAccessToken(localToken.accessToken));

	}, []);

	const checkAppEnums = (enums: object) => Object.values(enums).some((v) => !v);
	if (checkAppEnums(enums)) {
		console.log("is Loading");
	}

	return (
		<Switch>
			<Route path="/" component={HomePage} exact={true} />
			<Route path="/reservation" component={ReservationPage} exact={true}/>
			<Route path="/user/reservation-list" component={ReservationListPage} exact={true}/>
			<Route path="/users" component={UsersPage} exact={true} />
			<Route path="/counter" component={CounterPage} exact={true} />
			<Route path="/auth" component={AuthPage} exact={true} />
			<Route path="/admin" component={AdminPage} />
			<Route path="*" component={NotFoundPage} />
		</Switch>
	);
}

export default App;
