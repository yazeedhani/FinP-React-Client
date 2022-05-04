import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignUp = (props) => { 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [annualIncome, setAnnualIncome] = useState(0)
    const [totalLoans, setTotalLoans] = useState(0)
    const [accountOwner, setAccountOwner] = useState(null)

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {username, password, passwordConfirmation}
        const account = {annualIncome, accountOwner, totalLoans}

        console.log('ACCOUNT FROM SIGNUP COMP: ', account)

		signUp(credentials, account)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/monthTrackers'))
			.catch((error) => {
                setUsername('')
                setPassword('')
                setPasswordConfirmation('')
                setAnnualIncome(0)
                setTotalLoans(0)
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Sign Up</h3>
                <Form onSubmit={onSignUp}>
                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            name='username'
                            value={username}
                            placeholder='Enter username'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='annualIncome'>
                        <Form.Label>Annual Income</Form.Label>
                        <Form.Control
                            required
                            type='number'
                            name='annualIncome'
                            value={annualIncome}
                            placeholder='Enter annual income'
                            onChange={e => setAnnualIncome(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='totalLoans'>
                        <Form.Label>Total loans</Form.Label>
                        <Form.Control
                            required
                            type='number'
                            name='totalLoans'
                            value={totalLoans}
                            placeholder='Enter loans amount'
                            onChange={e => setTotalLoans(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Confirm Password'
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="outline-success" type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )

}

export default SignUp