import React, { useEffect, useState } from "react";
import { getAllMonthTrackers } from "../../api/monthTracker";
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';

import { deleteMonthTracker } from "../../api/monthTracker";

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
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
                <Card key={monthTracker._id} style={{ width: '25%'  }} className="m-2">
                    <Card.Title className='m-2'>
                        <Link to={`/monthTrackers/${monthTracker._id}`}>
                            {monthTracker.monthTrackerTitle}
                        </Link>
                    </Card.Title>
                    {/* <Link to={`/monthTrackers/${monthTracker._id}`}>
                        <Button variant="primary" className='m-2'>View</Button>
                    </Link> */}
                    <Button variant="primary" className='m-2' onClick={ () => deleteOneTracker(user, monthTracker._id)}>X</Button>
                    <Card.Body>
                        <Card.Text>Monthly Income: ${monthTracker.monthlyTakeHome}</Card.Text>
                        <Card.Text>Savings: ${monthTracker.monthly_savings}</Card.Text>
                        <Card.Text>Budget: ${monthTracker.budget}</Card.Text>
                    </Card.Body>
                </Card>
            )
        })
    }

    return (
        <>
            <div style={cardContainerLayout}>
                {monthTrackerCards}
            </div>
        </>
    )
}

export default MonthTrackers