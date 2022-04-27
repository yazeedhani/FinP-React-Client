import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { showMonthTracker, deleteExpense } from "../../api/monthTracker";
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { createExpense } from '../../api/monthTracker';

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
    }, [])


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

    const deleteOneExpense = (user, monthTrackerId, expenseId) => {
        deleteExpense(user, monthTrackerId, expenseId)
            .then( () => {
                // setUpdated( !prevState )
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

    // onClick={deleteOneExpense(user, expense.monthTracker, expense._id)}
    let expenseDivs = monthTracker.expenses.map( expense => {
        console.log('EXPENSE: ', expense)
        // return <div><strong>{expense.name}</strong> ${expense.amount} {expense.category} <button >X</button></div>
        return (
            <Card>
                <Card.Body>
                    <span>{expense.name}    </span>
                    <span>{expense.amount}   </span>
                    <span>{expense.category}   </span>
                    <Button variant='primary' type='submit' onClick={ () => deleteOneExpense(user, expense.monthTracker, expense._id)}>
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
                <Form onSubmit={handleSubmit} >
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
                        Add Expense
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
            <div>   Name    Amount   Category</div>
            {expenseDivs}
        </>
    )
}

export default ShowMonthTracker