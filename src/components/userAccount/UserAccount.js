import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Card, Container, Dropdown, DropdownButton, ListGroup, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { getUserAccount, updateUserAccount } from "../../api/userAccout";

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const UserAccount = (props) => {
    const { user, msgAlert } = props
    const [account, setAccount] = useState({savings: 0, cashlow: 0, income: 0})
    const [updatedAccount, setUpdatedAccount] = useState({savings: 0, cashlow: 0, income: 0})
    const [updated, setUpdated] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    useEffect( () => {
        getUserAccount(user)
            .then( res => {
                console.log('RES FROM ACCOUNT: ', res.data)
                setAccount(res.data.account)
                setUpdatedAccount(res.data.account)
                return res
            })
            .catch(console.error)
    }, [updated])

    const triggerRefresh = () => { 
        setUpdated(prev => !prev) 
    }

    const handleChange = (e) => {
        e.persist()

        setUpdatedAccount( prevUpdatedAccount => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]:value }

            return {...prevUpdatedAccount, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateUserAccount(user, updatedAccount)
            .then( () => triggerRefresh() )
            .then( () => setUpdatedAccount({savings: 0, cashlow: 0, income: 0}))
            .then( () => {
                msgAlert({
                    heading: 'Account Updated',
                    message: '',
                    variant: 'success'
                })
            })
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Account could not be updated.',
                    variant: 'danger'
                })
            })
    }

    console.log('ACCOUNT: ', account)

    return (
        <Container>
            <p>Username: {user.username}</p>
            <p>Annual Income: ${account.income}</p>
            <p>Total Savings: ${account.savings}</p>

            <Button>
                <Link to='/change-password' style={linkStyle}>
                    Change Password
                </Link>
            </Button>

            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Annual Income</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='expenseName'>
                        <Form.Label>Annual Income</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            name='income'
                            value={updatedAccount.income}
                            placeholder='Enter new income'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Button variant='primary' type='submit' onClick={handleClose}>
                        Edit Account
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}


export default UserAccount