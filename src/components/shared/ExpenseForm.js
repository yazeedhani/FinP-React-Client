import React, { useEffect } from "react";
import { Form, Button } from 'react-bootstrap/';
import DatePicker from "react-date-picker";

const ExpenseForm = (props) => {
    const {handleSubmit, handleChange, expense, buttonText, inputStyle, recurringExpenseCheckbox} = props

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
                    style={inputStyle}
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
                    style={inputStyle}
                />
            </Form.Group>
            <br/>
            <Form.Group controlId='date'>
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type='date'
                    name='date'
                    defaultValue={expense.date}
                    value={expense.date}
                    onChange={handleChange}
                    style={inputStyle}
                />
                {/* <DatePicker
                    name='date'
                    // selected={expense.date.toString()}
                    onChange={handleChange}
                    style={inputStyle}
                    value={expense.date}
                /> */}
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
                    style={inputStyle}
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
                    <option value="Income">Income</option>
                </Form.Select>
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="recurringExpense">
                <Form.Check 
                    type="checkbox" 
                    label="Is this a recurring transaction?"
                    name='recurring'
                    checked={expense.recurring}
                    onChange={handleChange} 
                />
            </Form.Group>
            {/* {recurringExpenseCheckbox()} */}
            <br/>
            <Button variant='success' type='submit' style={{ display: 'inline-block' }}>
                {buttonText}
            </Button>
        </Form>
    )
}

export default ExpenseForm