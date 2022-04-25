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