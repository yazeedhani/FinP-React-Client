import React from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Col, Row, FloatingLabel, Container} from 'react-bootstrap'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const divStyle = {
		width: 800,
		position: 'absolute', left: '47%', top: '30%',
    	transform: 'translate(-50%, -50%)',
		fontFamily: 'Inter'
	}

	const buttonStyle = {
		position: 'relative', left: '47%', top: '30%',
    	transform: 'translate(-50%, 40%)'
	}

	return (
		<div style={divStyle}>
			<h2 style={{ textAlign: 'center'}}>The convenient way to manage your money</h2>
			<article>
				Tracking where your money goes is complicated. 
				Looking at your bank statements can be overwhelming by only looking at an ongoing list of your transactions and not being able to make sense of your spending.
				With FinP, you are able to track your monthly spending and have all of your transactions categorized to make sense of where your money is being spent the most.
				FinP also allows you to track your monthly savings and loan payments as well as setup a monthly budget for your spending.
			</article>
			<br/>
			<Button variant='outline-success' style={buttonStyle}>
				<Link to='/sign-up' style={{ color: 'green', textDecoration: 'none' }}>Sign up now</Link>
			</Button>
		</div>
	)
}

export default Home
