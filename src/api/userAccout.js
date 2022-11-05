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

export const createRecurringTransaction = (user, recurringTransaction) => {
    return axios({
        url: `${apiUrl}/account/${user._id}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {recurringTransaction: recurringTransaction}
    })
}

export const updateRecurringTransaction = (user, transactionId, recurringTransaction) => {
    return axios({
        url: `${apiUrl}/account/${user._id}/recurringTrans/${transactionId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {recurringTransaction: recurringTransaction}
    })
}

export const deleteOneRecurrenceExpense = (user, recurringId) => {
    return axios({
        url: `${apiUrl}/account/${user._id}/${recurringId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: ''
    })
}