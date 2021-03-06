import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (credentials, account) => {
	console.log('ACCOUNT: ', account)
	console.log(typeof parseFloat(account.annualIncome))
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up',
		data: {
			credentials: {
				username: credentials.username,
				password: credentials.password,
				password_confirmation: credentials.passwordConfirmation,
			},
			account: {
				owner: account.accountOwner,
				income: parseFloat(account.annualIncome),
				loans: parseFloat(account.totalLoans)
			}
		},
	})
}

export const signIn = (credentials) => {
	return axios({
		url: apiUrl + '/sign-in',
		method: 'POST',
		data: {
			credentials: {
				username: credentials.username,
				password: credentials.password,
			},
		},
	})
}

export const signOut = (user) => {
	return axios({
		url: apiUrl + '/sign-out',
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const changePassword = (passwords, user) => {
	return axios({
		url: apiUrl + '/change-password',
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword,
			},
		},
	})
}
