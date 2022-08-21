import {createInstanceWithAuth} from "@/api/index";

export const crewAxios = createInstanceWithAuth('/party/crew');

export const party = {
    fetchPartycrew: async (lat, lng, distance) => {
        return crewAxios.get(`?lat=${lat}&lng=${lng}&distance=${distance}`);
    }
}