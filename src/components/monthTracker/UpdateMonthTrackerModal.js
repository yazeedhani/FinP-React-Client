import React, { useEffect, useState } from "react";
import { updateMonthTracker } from '../../api/monthTracker';
import { Button, Card, Form, Modal } from 'react-bootstrap';

const UpdateMonthTrackerModal = (props) => {
    const [monthTracker, setMonthTracker] = useState(props.monthTracker)
    const { user, triggerRefresh, setEditMonthTrackerShow, msgAlert, show, monthTrackerId } = props

    console.log('MONTHTRACKER IN UPDATEMONTHTRAKCER: ', monthTracker)

    const handleChange = (e) => {
        e.persist()

        setMonthTracker( prevProduct => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]:value }

            return {...prevProduct, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log('EXPENSE: ', expense)
        updateMonthTracker(user, monthTracker._id, monthTracker)
            // .then( res => {navigate(`/monthTrackers/${monthTrackerId}`)})
            .then( () => setEditMonthTrackerShow(false) )
            .then( () => triggerRefresh() )
            .then( () => {
                msgAlert({
                    heading: 'Tracker Updated',
                    message: 'Updated Monthly Tracker',
                    variant: 'success'
                })
            })
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Monthly Tracker could not be updated.',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={() => setEditMonthTrackerShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Tracker</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='annualIncome'>
                        <Form.Label>Annual Income</Form.Label>
                        <Form.Control
                            required
                            type='number'
                            name='annualTakeHome'
                            value={monthTracker.annualTakeHome}
                            placeholder='Enter annual income'
                            onChange={handleChange}
                        />
                    </Form.Group>
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
                    <Button variant='primary' type='submit'>
                        Edit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateMonthTrackerModal