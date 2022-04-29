import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip, Cell } from "recharts";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { showMonthTracker, deleteExpense, createExpense, updateExpense } from "../../api/monthTracker";
import { Button, Card, Modal, Container, Dropdown, DropdownButton, ListGroup, ButtonGroup } from 'react-bootstrap';
import ExpenseForm from "../shared/ExpenseForm";
import UpdateExpenseModal from "./UpdateExpenseModal";
import UpdateMonthTrackerModal from "./UpdateMonthTrackerModal";

const ShowMonthTracker = (props) => {
    // This state is what will be displayed on the monthTracker dashboard
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
    // This duplicate state of the above will be used to populate the edit tracker form in the modal
    // This is so that the data displated in the dashboard won't be changing simulatneosly as your
    // are typing in the edit form on the modal.
    // This is to trick React
    const [updatedTracker, setUpdatedTracker] = useState({
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
  
    let [category, setCategory ] = useState('All')
    const [selectedExpense, setSelectedExpense] = useState(null)
    
    const categoryArray = [
        {category: 'Housing', amount: 0},
        {category: 'Entertainment', amount: 0},
        {category: 'Auto', amount: 0},
        {category: 'Health', amount: 0},
        {category: 'Food', amount: 0},
        {category: 'Restaurant', amount: 0},
        {category: 'Shopping', amount: 0},
        {category: 'Loans', amount: 0},
        {category: 'Savings', amount: 0},
        {category: 'Other', amount: 0}
    ]

    const categoryColors = [
        '#0088FE', 
        '#00C49F', 
        '#FFBB28', 
        '#FF8042',
        '#ed5555',
        '#cc55ed',
        '#55e0ed',
        '#ef4c55',
        '#6255ed',
        '#5aed55'
    ]


    // Function To set the category with category selected from the dropdown menu
    let categorySelected = (cat) => {
        setCategory( cat )
    }

    const triggerRefresh = () => { 
        setUpdated(prev => !prev) 
    }

    useEffect( () => {
        showMonthTracker(user, monthTrackerId)
            .then( res => {
                setMonthTracker(res.data.monthTracker)
                setUpdatedTracker(res.data.monthTracker)
                console.log('EXPENSES IN USEEFFECT: ', res.data.monthTracker.expenses)
                return res.data.monthTracker
            })
            .catch(console.error)
    }, [updated])

    console.log('MONTHTRACKER: ', monthTracker)
 

    // const triggerRefresh = () => { 
    //     setUpdated(prev => !prev) 
    // }

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
            .then( res => console.log('NEW EXPENSE CREATED: ', res.data.expense))
            .then( () => setAddExpenseShow(false) )
            .then( () => triggerRefresh() )
            .then( () => setExpense({name: '', category: '', amount: null}))
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

    // Calculate if the user has met their budget for a single month tracker
    const meetingBudget = () => {
        if( totalExpenses < monthTracker.budget )
        {
            return (
                <p style={{color: 'green'}}>You are behind your budget!</p>
            )
        }
        else if( totalExpenses > monthTracker.budget )
        {
            return (
                <p style={{color: 'red'}}>You have exceeded your budget.</p>
            )
        }
        else
        {
            return (
                <p style={{color: 'blue'}}>You have met your budget.</p>
            )
        }
    }

    // Calculate total number of expenses
    // Savings will not be added to the expenses total
    let totalExpenses = 0
    monthTracker.expenses.forEach( expense => {
        if(expense.category !== 'Savings')
        totalExpenses += expense.amount
    })

    const expenses = monthTracker.expenses

    for(let i = 0; i < expenses.length; i++)
    {
        for(let object = 0; object < categoryArray.length; object++)
        {
            // console.log('EXPENSES[i].CATEGORY :', expenses[i].category)
            // console.log('CATEGORYARRAY[OBJECT].CATEGORY :', categoryArray[object].category)
            // console.log('expenses[i].category in categoryArray[object] :', expenses[i].category in categoryArray[object])
            if(expenses[i].category === categoryArray[object].category)
            {
                categoryArray[object].amount += expenses[i].amount
            }
        }
    }

    console.log('CATEGORYARRAY AFTER UPDATE: ', categoryArray)

    // To filter expenses by category
    let expenseDivs = monthTracker.expenses.map( exp => {
        // console.log('EXP: ', exp)
        if(exp.category === category)
        {
            return (
                <Card key={exp._id}>
                    <Card.Body>
                        <span>{exp.name}    </span>
                        <span>${exp.amount}   </span>
                        <span>{exp.category}   </span>
                        <Button 
                            variant='primary' 
                            type='submit' 
                            onClick={() => {
                                setSelectedExpense(exp)
                                // setExpense(exp)    
                                setEditExpenseShow(true)
                                }}>
                            Edit
                        </Button>
                        <UpdateExpenseModal 
                            expense={selectedExpense}
                            setSelectedExpense={setSelectedExpense}
                            show={editExpenseShow}
                            user={user}
                            msgAlert={msgAlert}
                            monthTrackerId={expense.monthTracker}
                            triggerRefresh={triggerRefresh}
                            onHide={() => setEditExpenseShow(false)}
                            setEditExpenseShow={setEditExpenseShow}
                        />
                        <Button variant='danger' type='submit' onClick={ () => deleteOneExpense(user, exp.monthTracker, exp._id)}>
                            X
                        </Button>
                    </Card.Body>
                </Card>
            )
        }
        else if(category === 'All')
        {
            return (
                <Card key={exp._id}>
                    <Card.Body>
                        <span>{exp.name}    </span>
                        <span>${exp.amount}   </span>
                        <span>{exp.category}   </span>
                        <Button 
                            variant='primary' 
                            type='submit' 
                            onClick={() => {
                                setSelectedExpense(exp)
                                // setExpense(exp)    
                                setEditExpenseShow(true)
                                }}>
                            Edit
                        </Button>
                        <UpdateExpenseModal 
                            expense={selectedExpense}
                            setSelectedExpense={setSelectedExpense}
                            show={editExpenseShow}
                            user={user}
                            msgAlert={msgAlert}
                            monthTrackerId={exp.monthTracker}
                            triggerRefresh={triggerRefresh}
                            onHide={() => setEditExpenseShow(false)}
                            setEditExpenseShow={setEditExpenseShow}
                        />
                        <Button variant='danger' type='submit' onClick={ () => deleteOneExpense(user, exp.monthTracker, exp._id)}>
                            X
                        </Button>
                    </Card.Body>
                </Card>
            )
        }
    })

    // console.log('EXPENSE DIVS AFTER CATEGORY SELECTED: ', expenseDivs)


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
                updatedTracker={updatedTracker}
                setUpdatedTracker={setUpdatedTracker}
                triggerRefresh={triggerRefresh}
                onHide={() => setEditMonthTrackerShow(false)}
                setEditMonthTrackerShow={setEditMonthTrackerShow}
            />
            <p></p>
            <ListGroup>
                <ListGroup.Item>Annual Income: ${monthTracker.annualTakeHome}</ListGroup.Item>
                <ListGroup.Item>Monthly Income: ${monthTracker.monthlyTakeHome}</ListGroup.Item>
                <ListGroup.Item>Monthly Budget: ${monthTracker.budget}</ListGroup.Item>
                <ListGroup.Item>Total Expenses: ${totalExpenses}</ListGroup.Item>
                <ListGroup.Item>Savings this month: $ {monthTracker.monthly_savings}</ListGroup.Item>
                <ListGroup.Item>Cashflow: ${monthTracker.monthlyTakeHome - totalExpenses - monthTracker.monthly_savings}</ListGroup.Item>
            </ListGroup>
            <p></p>
            <div>
                <p>
                    {meetingBudget()}
                </p>
            </div>

            <h3>Expenses</h3>



            
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={() => setAddExpenseShow(true)}>
                    Add Expense
                </Button>
                {/* Dropdown list to filter by expenses by category */}
                <DropdownButton id="dropdown-basic-button-2" title="Categories" >
                    <Dropdown.Item onClick={ () => categorySelected('All')}>All</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Housing')}>Housing</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Entertainment')}>Entertainment</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Auto')}>Auto</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Health')}>Health</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Food')}>Food</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Restaurant')}>Restaurant</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Shopping')}>Shopping</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Loans')}>Loans</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Savings')}>Savings</Dropdown.Item>
                    <Dropdown.Item onClick={ () => categorySelected('Other')}>Other</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
           

            {/* Modal to add a new expense */}
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

            {/* <h3>Savings</h3>
            <Button variant="primary">
                Add Savings
            </Button> */}

            {/* {categoryArray} */}
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <PieChart width={300} height={300}>
                <Pie data={categoryArray} dataKey="amount" nameKey="category" cx="50%" cy="50%" innerRadius={60} outerRadius={150} fill="green" paddingAngle={5} label>
                    {categoryArray.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                    ))}
                </Pie>
            </PieChart>
                {/* <Tooltip /> */}
            {/* </ResponsiveContainer> */}
        </Container>
    )
}

export default ShowMonthTracker