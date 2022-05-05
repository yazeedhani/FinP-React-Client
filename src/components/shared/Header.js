import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const authenticatedOptions = (
	<>
		<Nav.Link>
			<Link to='monthTrackers' style={linkStyle}>
				MyFinP
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='/monthTrackers/create' style={linkStyle}>
				Create Tracker
			</Link>
		</Nav.Link>
		{/* <Nav.Item>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item> */}
		{/* <Nav.Item>
			<Link to='/account/' style={linkStyle}>
				My Account
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item> */}
	</>
)

const userAccountAuthenticatedOptions = (
	<>
		<Nav.Link>
			<Link to='/account/' style={linkStyle}>
				My Account
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Link>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Link>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar collapseOnSelect sticky='top'  bg='success' variant='dark' expand='md'>
		<Container>
			<Navbar.Brand>
				<Link to='/' style={linkStyle}>
					FinP
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav className='me-auto'>
					
					{/* {user && (
						<span className='navbar-text mr-2'>Signed in as: {user.username}</span>
					)} */}
					{/* {alwaysOptions} */}
					{user ? authenticatedOptions : unauthenticatedOptions}
				</Nav>
				<Nav className='navbar-text'>
					{user && (
						<span className='navbar-text mr-2'>Signed in as: {user.username}</span>
					)}
					{user ? userAccountAuthenticatedOptions : <></>}	
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
)

export default Header
