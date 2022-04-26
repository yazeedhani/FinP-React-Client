import apiUrl from "../apiConfig";
import axios from "axios";

export const getAllMonthTrackers = (user) => {
    return axios({
        url: `${apiUrl}/monthTrackers`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: ''
    })
}

export const createMonthTracker = (user, newMonthTracker) => {
    return axios({
        url: `${apiUrl}/monthTrackers`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {monthTracker: newMonthTracker} 
    })
}

export const deleteMonthTracker = (user, monthTrackerId) => {
    return axios({
        url: `${apiUrl}/monthTrackers/${monthTrackerId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}