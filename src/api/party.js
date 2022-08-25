import {createInstanceWithAuth} from "@/api/index";

export const crewAxios = createInstanceWithAuth('/party/crew');
export const aloneAxios = createInstanceWithAuth('/party/alone');
export const partyAxios = createInstanceWithAuth('/party');

export const Party = {
    fetchPartyCrew: async (lat, lng, distance) => {
        return crewAxios.get(`?lat=${lat}&lng=${lng}&distance=${distance}`);
    },
    joinPartyCrew: async (partyId) => {
        return partyAxios.get(`/${partyId}/join`);
    },
    createParty: async (party) => {
        if (party.type === 'crew') {
            return crewAxios.post('', party, {headers : { "Content-Type": "multipart/form-data"}});
        } else {
            return aloneAxios.post('', party, {headers : { "Content-Type": "multipart/form-data"}});
        }
    },
    fetchMyPartyIn: async () => {
        return partyAxios.get('/my/in');
    },
    fetchPartyForTrainer: async () => {
        return partyAxios.get('/find');
    }
}