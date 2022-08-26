import axios from "axios";

export const Dagym = {
    fetchGymListByName: async (gymName) => {
        return axios.get(`${process.env.VUE_APP_API_HOST}/gymSearch/${gymName}`);
    },
}
