import React, { useEffect, useState } from "react";
import { updateExpense } from '../../api/monthTracker';
import ExpenseForm from "../shared/ExpenseForm";
import { Button, Card, Form, Modal } from 'react-bootstrap';

const UpdateExpenseModal = (props) => {
    // const [expense, setExpense] = useState(props.expense)
    const { user, triggerRefresh, msgAlert, show, monthTrackerId, setEditExpenseShow, expense, setExpense } = props

    const handleChange = (e) => {
        e.persist()

        setExpense( prevProduct => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]:value }

            return {...prevProduct, ...updatedValue}
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

    return (
        <Modal className='edit-modal' show={show} onHide={setEditExpenseShow}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ExpenseForm 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                // addAnotherExpense={addAnotherExpense}
                buttonText={'Edit Expense'}
                expense={expense}
            />
            </Modal.Body>
        </Modal>
    )
}

export default UpdateExpenseModal