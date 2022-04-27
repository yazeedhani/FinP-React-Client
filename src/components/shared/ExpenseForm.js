import React from "react";
import { Form, Button } from 'react-bootstrap/';

const ExpenseForm = (props) => {
    const {handleSubmit, handleChange, expense, addAnotherExpense} = props

    return (
        <Form onSubmit={handleSubmit}>
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
    )
}

export default ExpenseForm