import React, { useEffect, useState } from "react";
import { PieChart, Pie } from "recharts";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { showMonthTracker, deleteExpense, createExpense, updateExpense } from "../../api/monthTracker";
import { Button, Card, Modal, Container } from 'react-bootstrap';
import ExpenseForm from "../shared/ExpenseForm";
import UpdateExpenseModal from "./UpdateExpenseModal";
import UpdateMonthTrackerModal from "./UpdateMonthTrackerModal";

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
    const { user, msgAlert } = props
    const { monthTrackerId } = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [addExpenseShow, setAddExpenseShow] = useState(false)
    const [editExpenseShow, setEditExpenseShow] = useState(false)
    const [editMonthTrackerShow, setEditMonthTrackerShow] = useState(false)
    let categoryTotals = [{category: 'name', total: 0}] // {category: 'name', total: 0}

    useEffect( () => {
        showMonthTracker(user, monthTrackerId)
            .then( res => {
                setMonthTracker(res.data.monthTracker)
                return res.data.monthTracker
            })
            // .then( (monthTracker) => {
            //         console.log('MONTHTRACKER IN .THEN: ', monthTracker.expenses)
            //         console.log('categoryTotals: ', categoryTotals)    
            //         const expenses = monthTracker.expenses
            //         for(let i = 0; i < expenses.length; i++)
            //         {

            //             let category = expenses[i].category
            //             console.log('CATEGORY: ', category)
            //             // Object.values(categoryTotals[i]).includes(category)
            //             // console.log(`${category} in ${categoryTotals}`, category in categoryTotals[i])
            //             console.log(`CATEOGRYTOTALS[i] ${categoryTotals[i].category}`)
            //             console.log(`CATEOGRYTOTALS[i] ${categoryTotals[i].total}`)
            //             if(category === categoryTotals[i].category)
            //             {
            //                 console.log('TRUE')
            //                 console.log('CATEGORY in IF:', category)
            //                 console.log('categoryTotals[i]', categoryTotals[i].total)
            //                 // categoryTotals[i].total += parseFloat(expenses[i].amount)
            //                 console.log('categoryTotals: ', categoryTotals)
            //             }
            //             else
            //             {
            //                 console.log('FALSE')
            //                 console.log('CATEGORY in ELSE:', category)
            //                 // categoryTotals[`${category}`] = expenses[i].amount
            //                 categoryTotals.push({category: `${category}`, total: expenses[i].amount})
            //                 console.log('categoryTotals: ', categoryTotals)
            //                 console.log(`categoryTotals ${i}`, categoryTotals[i])
            //             }
            //         }
            // })
            .catch(console.error)
    }, [updated])

    console.log('MONTHTRACKER: ', monthTracker)

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
            .then( () => setAddExpenseShow(false) )
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

    const updateOneExpense = (user, monthTrackerId, expenseId) => {
        updateExpense(user, monthTrackerId, expenseId)
            .then( () => triggerRefresh() )
            .then( () => {
                msgAlert({
                    heading: 'Updated Expense',
                    message: '',
                    variant: 'success'
                })
            })
            .then( () => {navigate(`/monthTrackers/${monthTrackerId}/`)})
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Expense not able to be updated.',
                    variant: 'danger'
                })
        })
    }

    let totalExpenses = 0
    monthTracker.expenses.forEach( expense => {
        totalExpenses += expense.amount
    })


    let expenseDivs = monthTracker.expenses.map( expense => {
        return (
            <Card key={expense._id}>
                <Card.Body>
                    <span>{expense.name}    </span>
                    <span>${expense.amount}   </span>
                    <span>{expense.category}   </span>
                    <Button variant='primary' type='submit' onClick={() => setEditExpenseShow(true)}>
                    Edit
                    </Button>
                    <UpdateExpenseModal 
                        expense={expense}
                        show={editExpenseShow}
                        user={user}
                        msgAlert={msgAlert}
                        monthTrackerId={expense.monthTracker}
                        triggerRefresh={triggerRefresh}
                        onHide={() => setEditExpenseShow(false)}
                        setEditExpenseShow={setEditExpenseShow}
                    />
                    <Button variant='danger' type='submit' onClick={ () => deleteOneExpense(user, expense.monthTracker, expense._id)}>
                        X
                    </Button>
                </Card.Body>
            </Card>
        )
    })

    

    return (
        <Container>
            <div><h2>{monthTracker.month} {monthTracker.year}</h2></div><br/>
            <Button variant="primary" onClick={() => setEditMonthTrackerShow(true)}>
                Edit Tracker
            </Button>
            <UpdateMonthTrackerModal 
                show={editMonthTrackerShow}
                user={user}
                msgAlert={msgAlert}
                monthTrackerId={expense.monthTracker}
                monthTracker={monthTracker}
                triggerRefresh={triggerRefresh}
                onHide={() => setEditMonthTrackerShow(false)}
                setEditMonthTrackerShow={setEditMonthTrackerShow}
            />
            <p>Annual Income: ${monthTracker.annualTakeHome}</p>
            <p>Monthly Income: ${monthTracker.monthlyTakeHome}</p>
            <p>Monthly Budget: ${monthTracker.budget}</p>
            <p>Total Expenses: ${totalExpenses}</p>
            <p>Cashflow: ${monthTracker.monthlyTakeHome - totalExpenses}</p>

            <h3>Expenses</h3>
            <Button variant="primary" onClick={() => setAddExpenseShow(true)}>
                Add Expense
            </Button>
            

            <Modal show={addExpenseShow} onHide={() => setAddExpenseShow(false)}>
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
        </Container>
    )
}

export default ShowMonthTracker