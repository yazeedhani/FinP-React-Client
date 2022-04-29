import apiUrl from "../apiConfig";
import axios from "axios";

export const getUserAccount = (user) => {
    return axios({
        url: `${apiUrl}/account/${user._id}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: ''
    })
}

export const updateUserAccount = (user, updatedAccount) => {
    return axios({
        url: `${apiUrl}/account/${user._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {account: updatedAccount}
    })
}