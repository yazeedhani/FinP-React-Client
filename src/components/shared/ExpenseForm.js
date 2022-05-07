import React, { useEffect } from "react";
import { Form, Button } from 'react-bootstrap/';

const ExpenseForm = (props) => {
    const {handleSubmit, handleChange, expense, buttonText} = props

    // useEffect( () => {
    //     return function cleanup() {
            
    //       };
    // })

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
            <br/>
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
            <br/>
            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Select 
                    // as='select'
                    placeholder="Category"
                    value={expense.category}
                    name='category'
                    onChange={handleChange}
                >
                    <option></option>
                    <optgroup label="Expenses">
                        <option value="Entertainment">Entertainment</option>
                        <option value="Housing">Housing</option>
                        <option value="Food">Food</option>
                        <option value="Auto">Auto</option>
                        <option value="Health">Health</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Other">Other</option>
                    </optgroup>
                    <optgroup label="Savings">
                        <option value="Savings">Savings</option>
                    </optgroup>
                    <optgroup label="Loans">
                        <option value="Loans">Loans</option>
                    </optgroup>
                </Form.Select>
            </Form.Group>
            <br/>
            <Button variant='outline-success' type='submit'>
                {buttonText}
            </Button>
        </Form>
    )
}

export default ExpenseForm