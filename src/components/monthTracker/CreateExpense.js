import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap/';
import ExpenseForm from '../shared/ExpenseForm';
import { createExpense } from '../../api/monthTracker';

const CreateExpense = (props) => {
    const [newExpense, setNewExpense] = useState({name: '', category: '', amount: null})
    const { user, msgAlert } = props
    const {monthTrackerId} = useParams()
    const initialState = {name: '', category: '', amount: ''}
    const navigate = useNavigate()

    const inputStyle = {
        width: 400,
    }
    
    const formStyle = {
        position: 'absolute', left: '47%', top: '30%',
        transform: 'translate(-50%, -50%)'
    }

    const handleChange = (e) => {
        e.persist()

        // console.log('MONTHTRACKER BEFORE UPDATE: ', monthTracker)
        setNewExpense( prevProduct => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]:value }
            // console.log('MONTHTRACKER AFTER UPDATE: ', monthTracker)

            return {...prevProduct, ...updatedValue}
        })
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
        setNewExpense(initialState)
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