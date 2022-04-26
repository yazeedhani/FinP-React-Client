import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap/';

import { createExpense } from '../../api/monthTracker';

const CreateExpense = (props) => {
    const [expense, setExpense] = useState({name: '', category: '', amount: null})
    const { user, msgAlert } = props
    const {monthTrackerId} = useParams()
    const initialState = {name: '', category: '', amount: ''}
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.persist()

        // console.log('MONTHTRACKER BEFORE UPDATE: ', monthTracker)
        setExpense( prevProduct => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]:value }
            // console.log('MONTHTRACKER AFTER UPDATE: ', monthTracker)

            return {...prevProduct, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createExpense(user, monthTrackerId, expense)
            .then( res => {navigate(`/monthTrackers`)})
            .then( () => {
                msgAlert({
                    heading: 'Expense added',
                    message: 'Added Expense to Monthly Tracker',
                    variant: 'success'
                })
            })
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Expense could not be created.',
                    variant: 'danger'
                })
            })
    }

    const addAnotherExpense = () => {
        createExpense(user, monthTrackerId, expense)
            .then( res => {navigate(`/monthTrackers/${monthTrackerId}/expense`)})
            .then( () => {
                msgAlert({
                    heading: 'Expense added',
                    message: 'Added Expense to Monthly Tracker',
                    variant: 'success'
                })
            })
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Expense could not be created.',
                    variant: 'danger'
                })
            })
        setExpense(initialState)
    }

    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Add Expense</h3>
                <Form onSubmit={handleSubmit} onReset={addAnotherExpense}>
                    <Form.Group controlId='expenseName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            name='name'
                            value={expense.name}
                            placeholder='Enter name'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            required
                            type='number'
                            name='amount'
                            value={expense.amount}
                            placeholder='Enter amount'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control as='select'
                            placeholder="Category"
                            value={expense.category}
                            name='category'
                            onChange={handleChange}
                        >
                            <option></option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Housing">Housing</option>
                            <option value="Food">Food</option>
                            <option value="Auto">Auto</option>
                            <option value="Health">Health</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Loans">Loans</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Create Tracker
                    </Button>
                    <Button variant='primary' type='submit' onClick={addAnotherExpense}>
                        Add another expense
                    </Button>
                </Form>
                <Link to='/monthTrackers'>
                    Cancel
                </Link>
            </div>
        </div>
    )
}

export default CreateExpense