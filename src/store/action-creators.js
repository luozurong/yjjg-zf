import { INLOGIN,ACCOUNT,TOKEN } from "./action-type";

export const inLogin = (data)=>({
    type: INLOGIN,
    data: data
});

//账户
export const setAccount = (data)=>({
    type: ACCOUNT,
    data: data
});

//token
export const setToken = (data)=>({
    type: TOKEN,
    data: data
});