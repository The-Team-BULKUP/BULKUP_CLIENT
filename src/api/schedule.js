import {createInstanceWithAuth} from "@/api/index";

export const scheduleAxios = createInstanceWithAuth('/schedule');

export const Schedule = {
    fetchMySchedule: async () => {
        return scheduleAxios.get();
    },
    fetchTrainerSchedule: async () => {
        return scheduleAxios.get(`/trainer`);
    },
    makeExtraSchedule: async (schedule) => {
        return scheduleAxios.post(`/extra`, schedule, {headers : { "Content-Type": "multipart/form-data"}});
    },
    makePartySchedule: async (schedule) => {
        return scheduleAxios.post(`/party/${schedule.partyId}`, schedule, {headers : { "Content-Type": "multipart/form-data"}});
    }
}
