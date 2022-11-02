import React, { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { createRecurringTransaction } from "../../api/userAccout";

const CreateRecurringTransactionModal = (props) => {
    const { user, triggerRefresh, msgAlert } = props
    const [recurringTransaction, setRecurringTransaction] = useState({name: '', amount: 0, category: ''})
    // const [updatedRecurringTransaction, setUpdatedRecurringTransaction] = useState({name: '', amount: 0, category: ''})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        e.persist()

        setRecurringTransaction( prevRecurringTransaction => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]:value }
            console.log('prevRecurringTransaction:', prevRecurringTransaction)
            return {...prevRecurringTransaction, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createRecurringTransaction(user, recurringTransaction)
            .then( () => triggerRefresh() )
            .then( () => setRecurringTransaction({name: '', amount: 0, category: ''}))
            .then( () => {
                msgAlert({
                    heading: 'Added Recurring Transaction',
                    message: '',
                    variant: 'success'
                })
            })
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Cannot add recurring transaction.',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                    Add Transaction
                </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Recurring Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                name='name'
                                value={recurringTransaction.name}
                                placeholder='New recurring transaction name'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                placeholder="Category"
                                value={recurringTransaction.category}
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
                                value={recurringTransaction.amount}
                                placeholder='Enter amount'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br/>
                        <Button variant='success' type='submit'>
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateRecurringTransactionModal