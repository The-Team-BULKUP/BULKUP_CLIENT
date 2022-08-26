import {createInstanceWithAuth} from "@/api/index";

export const signupTrainerAxios = createInstanceWithAuth('/signup/trainer');
export const signupUserAxios = createInstanceWithAuth('/signup/user');
export const userInfoAxios = createInstanceWithAuth('/my');

export const Account = {
    makeUserAccount: async (account) => {
        return signupUserAxios.post("", account, {headers : { "Content-Type": "multipart/form-data"}});
    },
    makeTrainerAccount: async (account) => {
        return signupTrainerAxios.post("", account, {headers : { "Content-Type": "multipart/form-data"}});
    },
    fetchMyInfo: async () => {
        return userInfoAxios.get();
    }
}
