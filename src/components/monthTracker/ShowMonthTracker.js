import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { showMonthTracker, deleteExpense } from "../../api/monthTracker";
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { createExpense } from '../../api/monthTracker';
import ExpenseForm from "../shared/ExpenseForm";

const ShowMonthTracker = (props) => {
    const [monthTracker, setMonthTracker] = useState({
        month: '',
        year: '',
        annualTakeHome: 0,
        monthlyTakeHome: 0,
        budget: 0,
        monthly_savings: 0,
        monthly_cashflow: 0,
        expenses: [],
    })
    const [expense, setExpense] = useState({name: '', category: '', amount: null})
    const [updated, setUpdated] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { user, msgAlert } = props
    const { monthTrackerId } = useParams()
    const navigate = useNavigate()

    useEffect( () => {
        showMonthTracker(user, monthTrackerId)
            .then( res => {
                setMonthTracker(res.data.monthTracker)
            })
            .catch(console.error)
    }, [updated])

    const triggerRefresh = () => { 
        setUpdated(prev => !prev) 
    }

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

        createExpense(user, monthTrackerId, expense)
            // .then( res => {navigate(`/monthTrackers/${monthTrackerId}`)})
            .then( () => handleClose() )
            .then( () => triggerRefresh() )
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

    const deleteOneExpense = (user, monthTrackerId, expenseId) => {
        deleteExpense(user, monthTrackerId, expenseId)
            .then( () => triggerRefresh() )
            .then( () => {
                msgAlert({
                    heading: 'Deleted Expense',
                    message: '',
                    variant: 'success'
                })
            })
            .then( () => {navigate(`/monthTrackers/${monthTrackerId}/`)})
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Expense not able to be deleted.',
                    variant: 'danger'
                })
            })
    }

    let totalExpenses = 0

    monthTracker.expenses.forEach( expense => {
        totalExpenses += expense.amount
    })

    let expenseDivs = monthTracker.expenses.map( expense => {
        // console.log('EXPENSE: ', expense)
        // return <div><strong>{expense.name}</strong> ${expense.amount} {expense.category} <button >X</button></div>
        return (
            <Card>
                <Card.Body>
                    <span>{expense.name}    </span>
                    <span>${expense.amount}   </span>
                    <span>{expense.category}   </span>
                    <Button variant='danger' type='submit' onClick={ () => deleteOneExpense(user, expense.monthTracker, expense._id)}>
                        X
                    </Button>
                </Card.Body>
            </Card>
            )
    })

    return (
        <>
            <div>{monthTracker.month} {monthTracker.year}</div><br/>
            <p>Annual Income: ${monthTracker.annualTakeHome}</p>
            <p>Monthly Income: ${monthTracker.monthlyTakeHome}</p>
            <p>Monthly Budget: ${monthTracker.budget}</p>
            <p>Total Expenses: ${totalExpenses}</p>
            <p>Cashflow: ${monthTracker.monthlyTakeHome - totalExpenses}</p>

            <h3>Expenses</h3>
            <Button variant="primary" onClick={handleShow}>
                Add Expense
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ExpenseForm 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    // addAnotherExpense={addAnotherExpense}
                    buttonText={'Add Expense'}
                    expense={expense}
                />
                </Modal.Body>
            </Modal>
            <div>   Name    Amount   Category</div>
            {expenseDivs}
        </>
    )
}

export default ShowMonthTracker