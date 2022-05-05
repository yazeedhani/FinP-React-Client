import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import {Form, Button, Col, Row, FloatingLabel, Container} from 'react-bootstrap'

const SignUp = (props) => { 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [annualIncome, setAnnualIncome] = useState(0)
    const [totalLoans, setTotalLoans] = useState(0)
    const [accountOwner, setAccountOwner] = useState(null)
    const navigate = useNavigate()

    const inputStyle = {
        width: 400,
    }
    
    const buttonStyle = {
        width: 400,
    }
    
    const formStyle = {
        position: 'absolute', left: '50%', top: '45%',
        transform: 'translate(-50%, -50%)'
    }

    const incomeAndLoansInput = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap' 
    }


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
        // <div className='row'>
        //     <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <div style={formStyle}>
            <h3>Sign Up</h3>
            <Form onSubmit={onSignUp}>
                <Row>
                    <Col>
                        <Form.Group controlId='annualIncome' style={{ width: 187 }}>
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
                    </Col>
                    <Col>
                        <Form.Group controlId='totalLoans' style={{ width: 187 }}>
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
                    </Col>
                </Row>
                <br/>
                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        style={inputStyle}
                        type='text'
                        name='username'
                        value={username}
                        placeholder='Enter username'
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        style={inputStyle}
                        name='password'
                        value={password}
                        type='password'
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='passwordConfirmation'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                        required
                        style={inputStyle}
                        name='passwordConfirmation'
                        value={passwordConfirmation}
                        type='password'
                        placeholder='Confirm Password'
                        onChange={e => setPasswordConfirmation(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Button variant="outline-success" type='submit' style={buttonStyle}>
                    Sign Up
                </Button>
            </Form>
            <br/>
            <span>Already have an account? <Link to='/sign-in' style={{ textDecoration: 'none' }}>Sign in</Link> </span>
        </div>
        //     </div>
        // </div>
    )

}

export default SignUp