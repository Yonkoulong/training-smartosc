import dayjs from "dayjs";
import bcrypt from 'bcryptjs';

import { http } from "../services/http";

interface LoginResponseSuccess {
    accessToken: string;
}

interface LoginResponseFail {
    message: string;
}

interface LoginParams {
    username: string;
    password: string;
}

interface RegisterBody {
    userName: string;
    password: string;
    email: string;
    phoneNumber?: string;
}

interface UsernameExists {
    username: string;
}

const wrongUsernameorPasswordError = {
    message: "Wrong username or password"
}

const accountExist = {
    message: "This username is already being used"
}

export const AuthService = {

    login: async function (params:LoginParams): Promise<LoginResponseSuccess | LoginResponseFail> {
        //step 1: fetch All user
        const response = await http.get<any>("/users");
        
        if(!response) {
            throw new Error('server error');
        }

        //step 2: validate
        //info was recieved from client
        const {username, password} = params;
        //step 2.1: username exits 
        const matchedUser = response.data.find((u:any) => u.userName === username);
        
        if(!matchedUser) {
            return wrongUsernameorPasswordError;
        }

        //assgin password from db to hasedPassword variable
        const hashedPassword = matchedUser.password
        
        const isValid = await new Promise((resolve,reject)=>{
            bcrypt.compare(password, hashedPassword, function(err,result){
                if(err) {
                    return reject(err);
                }
                resolve(result)
            })
        });
        
        if(!isValid) {
            return wrongUsernameorPasswordError;
        }

        const expiry = dayjs().add(1, 'hour').unix();
        return { 
            accessToken: matchedUser.id,
        }
    },

    register: async function (body: RegisterBody) {
        const  saltRounds = 10;
        const  requiredProps: (keyof RegisterBody)[] = ['userName', 'email', 'password'];

        for(const rp of requiredProps) {
            if(!body[rp]) {
                return;
            }
        }

        //step 1: fetch All user
        const response = await http.get<any>("/users");
    
        if(!response) {
            throw new Error('server error');
        }

        //step 2: validate
        //info was recieved from client
        
        const {userName} = body;
        //step 2.1: username exits 
        const matchedUser = response.data.find((u:any) => u.userName === userName);
        
        if(matchedUser) {
            return accountExist;
        }

        const hashpw = await new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(body.password, salt, (err, hash) => {
                    if(err) return reject(err);
                    resolve(hash);
                }) 
            })
        })        
        body.password = hashpw + "";
        
        const account = await http.post<any>(`/users`, body);
    },  
}