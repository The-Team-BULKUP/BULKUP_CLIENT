import {createInstanceWithAuth} from "@/api/index";

export const trainerAxios = createInstanceWithAuth('/trainer');

export const Trainer = {
    fetchTrainerByDistance: async (params) => {
        return trainerAxios.get(params);
    },
}
