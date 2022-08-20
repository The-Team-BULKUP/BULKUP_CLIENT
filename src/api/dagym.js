import {HOST} from "@/api/index";
import axios from "axios";

export const Dagym = {
    fetchGymListByName: async (gymName) => {
        console.info(`${HOST}/gymSearch/${gymName}`);
        return axios.get(`${HOST}/gymSearch/${gymName}`);
        // return gymListNameAxios.get("", {headers : { "Content-Type": "multipart/form-data"}});
    },
    // fetchGymListByPoint: async (account) => {
    //     // return dagymAxios.get("", account, {headers : { "Content-Type": "multipart/form-data"}});
    // },
}
