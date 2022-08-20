import axios from 'axios';
import { setInterceptors } from './interceptors';
import loginStore from "@/api/store/auth";
import Auth from "@/api/store/auth";
export const HOST = process.env["API_HOST"] || "http://localhost:8080/api/v1";

// export function createInstanceAtRoot(url) {
//     return axios.create({
//         baseURL: DEFAULT_HOST + url
//     });
//
export function createInstanceWithAuth(url) { // Token값과 특정 url을 붙여서 셋팅
    let strTokenExpired = loginStore.state.tokenExpired;
    strTokenExpired = strTokenExpired.replace("KST", "");
    let tokenExpired = Date.parse(strTokenExpired);
    let now = new Date().getTime();

    if (now > tokenExpired){
        tokenReissue();
    }
    // 토큰 만료가 아니면
    const instance = axios.create({
        baseURL: `${HOST}${url}`,
    })
    return setInterceptors(instance);
}

export function tokenReissue(){
    console.log("토큰을 재발급합니다.");
    Auth.dispatch("doReissue").then(() => console.log("토큰 재발행 완료"));
}

// export const instance = createInstance();
export const accountAxios = createInstanceWithAuth('/signup');

