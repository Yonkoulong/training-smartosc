import dayjs from "dayjs";

import { redirectTo } from "@/utils/history.utils";
import react, { useEffect, useState } from 'react';


export function withGuard(Component:any) {

    function Guard(props: any) {
        const [isLogin, setIsLogin] = useState<true | false>();
   
        useEffect(() => {
            const localToken = localStorage.getItem('token');
            if(!localToken) {
                setIsLogin(false);
                return;
            }
            const parsedToken = JSON.parse(localToken);
            setIsLogin(true)
            // if(isExpired)
        }, [])

        if(isLogin === undefined) return console.log("authencation");
        if(isLogin === false) return redirectTo("/auth");

      
    }

    return Guard
}