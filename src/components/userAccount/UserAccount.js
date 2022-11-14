import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Card, Container, Dropdown, DropdownButton, ListGroup, ButtonGroup, Modal, Table, Form } from 'react-bootstrap';
import { deleteOneRecurrenceExpense, getUserAccount, updateUserAccount, createRecurringTransaction } from "../../api/userAccout";
import CreateRecurringTransactionModal from "./CreateRecurringTransModal";
import UpdateRecurringTransactionModal from "./UpdateRecurringExpenseModal";

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const UserAccount = (props) => {
    const { user, msgAlert } = props
    const [account, setAccount] = useState({savings: 0, cashlow: 0, income: 0, loans: 0, recurrences: []})
    const [updatedAccount, setUpdatedAccount] = useState({savings: 0, cashlow: 0, income: 0, loans: 0, recurrences: []})
    const [updated, setUpdated] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'amount', label: 'Amount', minWidth: 100 },
        {
          id: 'category',
          label: 'Category',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'actions',
          label: 'Actions',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        }
      ];

    useEffect( () => {
        getUserAccount(user)
            .then( res => {
                console.log('RES FROM ACCOUNT: ', res.data)
                setAccount(res.data.account)
                setUpdatedAccount(res.data.account)
                return res
            })
            .catch(console.error)
    }, [updated])

    const triggerRefresh = () => { 
        setUpdated(prev => !prev) 
    }

    const handleChange = (e) => {
        e.persist()

        setUpdatedAccount( prevUpdatedAccount => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]:value }

            return {...prevUpdatedAccount, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateUserAccount(user, updatedAccount)
            .then( () => triggerRefresh() )
            .then( console.log('UPDATED ACCOUNT: ', updatedAccount))
            .then( () => setUpdatedAccount({savings: 0, cashlow: 0, income: 0, loans: 0}))
            .then( () => {
                msgAlert({
                    heading: 'Account Updated',
                    message: '',
                    variant: 'success'
                })
            })
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Account could not be updated.',
                    variant: 'danger'
                })
            })
    }

    const deleteRecurrenceExpense = (user, recurringId) => {
        deleteOneRecurrenceExpense(user, recurringId)
            .then( () => {
                console.log('TRIGGERED REFRESH')
                triggerRefresh()
            })
            .then( () => {
                setUpdated(true)
                msgAlert({
                    heading: 'Deleted Recurring Expense',
                    message: '',
                    variant: 'success'
                })
            })
            .then( () => {navigate(`/account/`)})
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Recurring expense not able to be deleted.',
                    variant: 'danger'
                })
            })
    }

    // Display recurring expenses/transaction in My Account view
    let recurringExpenses

    if(!account.recurrences)
    {
        return <p>Loading...</p>
    }
    else if(account.recurrences === 0)
    {
        return <p>No recurring expenses</p>
    }
    else if(account.recurrences.length > 0)
    {
        recurringExpenses = account.recurrences.map( (recurringExpense, index) => {
            console.log('RECURRING EXPENSE: ', recurringExpense)
            return (
                <tr key={recurringExpense._id}>
                    <td>{recurringExpense.name}</td>
                    <td style={{color: recurringExpense.category !== 'Income' ? 'red' : 'green' }}>${recurringExpense.amount}</td>
                    <td>{recurringExpense.category}</td>
                    {/* <td>{date}</td> */}
                    <td>
                        <UpdateRecurringTransactionModal
                            triggerRefresh={triggerRefresh}
                            user={user}
                            msgAlert={msgAlert}
                            transaction={recurringExpense}
                        />
                        <Button variant="danger" style={{marginLeft: 5}} type='submit' onClick={ () => deleteRecurrenceExpense(user, recurringExpense.recurringId)}>
                            <i class="material-icons">delete_forever</i>
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    console.log('ACCOUNT: ', account)

    return (
        <Container>
            <br/>
            <h3>Account Summary</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Annual Income:</strong> ${account.income}</p>
            <p><strong>Total Savings:</strong> ${account.savings}</p>
            <p><strong>Total Loans:</strong> ${account.loans}</p>
            <p><strong>Total Cashlow:</strong> ${account.cashflow}</p>
            
            <CreateRecurringTransactionModal
                triggerRefresh={triggerRefresh}
                user={user}
                msgAlert={msgAlert}
            />

            <p><strong>Recurring Transactions:</strong></p>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        {/* <th>Date</th> */}
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {recurringExpenses}
                </tbody>
            </Table>


            <Button variant="success">
                <Link id="link-change-password" to='/change-password' style={linkStyle}>
                    Change Password
                </Link>
            </Button>
            <Button variant="success" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='annualIncome'>
                        <Form.Label>Annual Income</Form.Label>
                        <Form.Control
                            required
                            type='number'
                            name='income'
                            value={updatedAccount.income}
                            placeholder='Enter new income'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='loans'>
                        <Form.Label>Total Loans</Form.Label>
                        <Form.Control
                            required
                            type='number'
                            name='loans'
                            value={updatedAccount.loans}
                            placeholder='Enter loan amount'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Button variant='success' type='submit' onClick={handleClose}>
                        Edit Account
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}


export default UserAccount