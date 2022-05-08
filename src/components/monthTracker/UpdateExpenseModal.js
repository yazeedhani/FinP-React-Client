import React, { useEffect, useState } from "react";
import { updateExpense } from '../../api/monthTracker';
import ExpenseForm from "../shared/ExpenseForm";
import { Button, Card, Form, Modal } from 'react-bootstrap';

const UpdateExpenseModal = (props) => {
    // const [expense, setExpense] = useState(props.expense)
    const { user, triggerRefresh, msgAlert, show, monthTrackerId, setEditExpenseShow, expense, setSelectedExpense } = props

    const handleChange = (e) => {
        e.persist()

        setSelectedExpense( prevExp => {
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

            const updatedValue = { [name]:value }

            return {...prevExp, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('EXPENSE: ', expense)
        updateExpense(user, monthTrackerId, expense._id, expense)
            // .then( res => {navigate(`/monthTrackers/${monthTrackerId}`)})
            .then( () => setEditExpenseShow(false) )
            .then( () => triggerRefresh() )
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

    console.log('EXPENSE in UPDATEMODAL: ', expense)
    return (
        <Modal className='edit-modal' show={show} onHide={setEditExpenseShow}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ExpenseForm 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                // addAnotherExpense={addAnotherExpense}
                buttonText={'Edit Transaction'}
                expense={expense}
            />
            </Modal.Body>
        </Modal>
    )
}

export default UpdateExpenseModal