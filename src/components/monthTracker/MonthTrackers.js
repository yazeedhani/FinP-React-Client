import React, { useEffect, useState } from "react";
import { getAllMonthTrackers } from "../../api/monthTracker";
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';

import { deleteMonthTracker } from "../../api/monthTracker";

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap',
    // marginLeft: 5
}

const MonthTrackers = (props) => {
    const { user, msgAlert } = props
    const [monthTrackers, setMonthTrackers] = useState(null)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    useEffect( () => {
        getAllMonthTrackers(user)
            .then( res => {
                setMonthTrackers(res.data.monthTrackers)
            })
            .catch(console.error)
    }, [updated])

    const deleteOneTracker = (user, monthTrackerId) => {
        deleteMonthTracker(user, monthTrackerId)
            .then( () => triggerRefresh() )
            .then( () => {
                setUpdated(true)
                msgAlert({
                    heading: 'Deleted Tracker',
                    message: '',
                    variant: 'success'
                })
            })
            .then( () => {navigate(`/monthTrackers`)})
            .catch( () => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Month tracker not able to be deleted.',
                    variant: 'danger'
                })
            })
    }

    const triggerRefresh = () => { 
        setUpdated(prev => !prev) 
    }

    if(!monthTrackers) {
        return <p>Loading...</p>
    }
    else if(monthTrackers.length === 0) {
        return <p>Add a month tracker</p>
    }

    let monthTrackerCards

    if(monthTrackers.length > 0) {
        monthTrackerCards = monthTrackers.map( monthTracker => {
            return (
                <>
                    <Card 
                        key={monthTracker._id}
                        border="success" 
                        // style={{ width: '25%'  }} 
                        // className="m-2"
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Link to={`/monthTrackers/${monthTracker._id}`} style={{color: 'green', textDecoration: 'none'}}>
                            <Card.Header>
                                {monthTracker.monthTrackerTitle}
                            </Card.Header>
                        </Link>
                        {/* <Link to={`/monthTrackers/${monthTracker._id}`}>
                            <Button variant="primary" className='m-2'>View</Button>
                        </Link> */}
                        <Card.Body>
                            <Card.Text>Monthly Income: ${monthTracker.monthlyTakeHome.toFixed(2)}</Card.Text>
                            <Card.Text>Savings: ${monthTracker.monthly_savings}</Card.Text>
                            <Card.Text>Loan repayments: ${monthTracker.monthly_loan_payments}</Card.Text>
                            <Card.Text>Budget: ${monthTracker.budget}</Card.Text>
                        </Card.Body>
                        <Button variant="outline-danger" className='m-2 delete-button-monthTracker' onClick={ () => deleteOneTracker(user, monthTracker._id)}><i class="material-icons">delete_forever</i></Button>
                    </Card>
                </>
            )
        })
    }

    return (
        <>
            <br/>
            <br/>
            <div style={cardContainerLayout}>
                {monthTrackerCards}
            </div>
        </>
    )
}

export default MonthTrackers