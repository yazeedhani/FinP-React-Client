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

export const showMonthTracker = (user, monthTrackerId) => {
    return axios({
        url: `${apiUrl}/monthtrackers/${monthTrackerId}`,
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

export const updateMonthTracker = (user, monthTrackerId, updatedMonthTracker) => {
    return axios({
        url: `${apiUrl}/monthTrackers/${monthTrackerId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {monthTracker: updatedMonthTracker} 
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

export const createExpense = (user, monthTrackerId, newExpense) => {
    return axios({
        url: `${apiUrl}/monthTrackers/${monthTrackerId}/expense`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {expense: newExpense}
    })
}

export const deleteExpense = (user, monthTrackerId, expenseId) => {
    return axios({
        url: `${apiUrl}/monthTrackers/${monthTrackerId}/${expenseId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const updateExpense = (user, monthTrackerId, expenseId, updatedExpense) => {
    return axios({
        url: `${apiUrl}/monthTrackers/${monthTrackerId}/${expenseId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {expense: updatedExpense}
    })
}