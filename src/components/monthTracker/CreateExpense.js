import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap/';
import ExpenseForm from '../shared/ExpenseForm';
import { createExpense } from '../../api/monthTracker';

const CreateExpense = (props) => {
    const [newExpense, setNewExpense] = useState({name: '', category: '', amount: null, recurring: false})
    const { user, msgAlert } = props
    const {monthTrackerId} = useParams()
    const initialState = {name: '', category: '', amount: '', recurring: false}
    const navigate = useNavigate()

    const inputStyle = {
        width: 400,
    }
    
    const formStyle = {
        position: 'absolute', left: '47%', top: '40%',
        transform: 'translate(-50%, -50%)'
    }

    // Recurring expense checkbox to put into a form when passed in as a prop to ExpenseForm
    const recurringExpenseCheckbox = () => {
        return (
            <Form.Group className="mb-3" controlId="recurringExpense">
                <Form.Check 
                    type="checkbox"
                    label="Is this a recurring transaction?"
                    name='recurring'
                    checked={newExpense.recurring}
                    onChange={handleChange} 
                />
            </Form.Group>
        )
    }

    console.log('newExpense BEFORE UPDATE: ', newExpense)
    const handleChange = (e) => {
        e.persist()

        setNewExpense( prevExpense => {
            const name = e.target.name
            let value = e.target.value

            if( name === 'recurring' && e.target.checked)
            {
                value = true
            }
            else if( name === 'recurring' && !e.target.checked)
            {
                value = false
            }

            const updatedValue = { [name]: value }
            
            return {...prevExpense, ...updatedValue}
        })
        console.log('newExpense AFTER UPDATE: ', newExpense)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createExpense(user, monthTrackerId, newExpense)
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

        createExpense(user, monthTrackerId, newExpense)
            .then( res => {
                setNewExpense(initialState)
                navigate(`/monthTrackers/${monthTrackerId}/expense`)
            })
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
        console.log('NEW EXPENSE RESET TO INTIAL EXPENSE: ', newExpense)
    }

    return (
        <div className='row' style={formStyle}>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Add Transaction</h3>
                <ExpenseForm 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    // addAnotherExpense={addAnotherExpense}
                    buttonText={'Create Tracker'}
                    expense={newExpense}
                    inputStyle={inputStyle}
                    recurringExpenseCheckbox={recurringExpenseCheckbox}
                />
                <br/>
                <Button variant='outline-success' type='success' onClick={addAnotherExpense} style={{ display: 'inline-block' }}>
                        Add another transaction
                </Button>
                <br/>
                <Button variant='outline-danger' style={{ display: 'inline-block' }}>
                    <Link to='/monthTrackers' style={{ textDecoration: 'none', color: 'red' }}>
                        Cancel
                    </Link>
                </Button>    
            </div>
        </div>
    )
}

export default CreateExpense