import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import { Form, Button } from 'react-bootstrap'

const inputStyle = {
    width: 400,
}

const buttonStyle = {
    width: 400,
}

const formStyle = {
    position: 'absolute', left: '50%', top: '30%',
    transform: 'translate(-50%, -50%)'
}

const SignIn = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {username, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/monthTrackers'))
			.catch((error) => {
                setUsername('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row'style={formStyle}>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Sign In</h3>
                <Form onSubmit={onSignIn}>
                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            style={inputStyle}
                            type='text'
                            name='username'
                            value={username}
                            placeholder='Enter username'
                            className='sign-in-form-input'
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
                            placeholder='Enter password'
                            className='sign-in-form-input'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Button style={buttonStyle} variant="outline-success" type='submit'>
                        Submit
                    </Button>
                </Form>
                <br/>
                <span>Don't have an account yet? <Link to='/sign-up' style={{ textDecoration: 'none' }}>Sign up</Link> </span>
            </div>
        </div>
    )
}

export default SignIn
