import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap/';

import { createMonthTracker } from '../../api/monthTracker';

const CreateMonthTracker = (props) => {
    const [monthTracker, setMonthTracker] = useState({month: '', year: null, budget: null})
    const { user, msgAlert } = props
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.persist()

        // console.log('MONTHTRACKER BEFORE UPDATE: ', monthTracker)
        setMonthTracker( prevProduct => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]:value }
            // console.log('MONTHTRACKER AFTER UPDATE: ', monthTracker)

            return {...prevProduct, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createMonthTracker(user, monthTracker)
            .then( res => {
                console.log('RES: ', res)
                return res
            })
            .then( res => {navigate(`/monthTrackers/${res.data.monthTracker._id}/expense`)})
            .then( () => {
                msgAlert({
                    heading: 'Tracker added',
                    message: 'Added Monthly Tracker',
                    variant: 'success'
                })
            })
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Month tracker not able to be created.',
                    variant: 'danger'
                })
            })
    }

    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Enter Tracker Info</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="month">
                        <Form.Label>Month</Form.Label>
                        <Form.Control as='select'
                            placeholder="Month"
                            value={monthTracker.month}
                            name='month'
                            onChange={handleChange}
                        >
                            <option></option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='year'>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            required
                            type='number'
                            name='year'
                            value={monthTracker.year}
                            placeholder='Enter year'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='budget'>
                        <Form.Label>Monthly Budget</Form.Label>
                        <Form.Control
                            required
                            type='number'
                            name='budget'
                            value={monthTracker.budget}
                            placeholder='Enter budget'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Button variant='success' type='submit'>
                        Transactions
                    </Button>
                </Form>
            </div>
        </div>
    )

}



export default CreateMonthTracker