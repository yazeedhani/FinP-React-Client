import React, { useEffect, useState } from "react";
import { updateExpense } from '../../api/monthTracker';
import ExpenseForm from "../shared/ExpenseForm";
import { Button, Card, Form, Modal } from 'react-bootstrap';

const UpdateExpenseModal = (props) => {
    const { user, triggerRefresh, msgAlert, monthTrackerId, transaction } = props
    const [updatedTransaction, setUpdatedTransaction] = useState(transaction)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        e.persist()

        setUpdatedTransaction ( prevUpdateTransaction => {
            const name = e.target.name
            let value = e.target.value

            console.log('E.TARGET.CHECKED: ', e.target.checked === true)
            if( name === 'recurring' && e.target.checked)
            {
                value = true
            }
            else if( name === 'recurring' && e.target.checked === false)
            {
                value = false
            }

            const updatedValue = { [name]:value }

            return {...prevUpdateTransaction, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateExpense(user, monthTrackerId, updatedTransaction._id, updatedTransaction)
            .then( () => triggerRefresh() )
            .then( () => setUpdatedTransaction(updatedTransaction))
            .then( () => setShow(false) )
            .then( () => {
                msgAlert({
                    heading: 'Expense Updated',
                    message: 'Updated Expense to Monthly Tracker',
                    variant: 'success'
                })
            })
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Expense could not be updated.',
                    variant: 'danger'
                })
            })
    }

    console.log('TRANSACTION in UPDATEMODAL: ', transaction)

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <i class="material-icons">edit</i>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                name='name'
                                value={updatedTransaction.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={updatedTransaction.category}
                                name='category'
                                onChange={handleChange}
                            >
                                <option></option>
                                <optgroup label="Expenses">
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Housing">Housing</option>
                                    <option value="Food">Food</option>
                                    <option value="Auto">Auto</option>
                                    <option value="Health">Health</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Other">Other</option>
                                </optgroup>
                                <optgroup label="Savings">
                                    <option value="Savings">Savings</option>
                                </optgroup>
                                <optgroup label="Loans">
                                    <option value="Loans">Loans</option>
                                </optgroup>
                                <option value="Income">Income</option>
                            </Form.Select>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='amount'>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                required
                                type='number'
                                name='amount'
                                value={updatedTransaction.amount}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br/>
                        <Button variant='success' type='submit'>
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateExpenseModal