import axios from "axios";

export const Dagym = {
    fetchGymListByName: async (gymName) => {
        return axios.get(`${process.env.VUE_APP_API_HOST}_/gymSearch/${gymName}`);
        // return gymListNameAxios.get("", {headers : { "Content-Type": "multipart/form-data"}});
    },
    // fetchGymListByPoint: async (account) => {
    //     // return dagymAxios.get("", account, {headers : { "Content-Type": "multipart/form-data"}});
    // },
}
