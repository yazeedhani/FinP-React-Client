import React, { useEffect, useState } from "react";
import { getAllMonthTrackers } from "../../api/monthTracker";
import { Button, Card } from 'react-bootstrap'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const MonthTrackers = (props) => {
    const {user} = props

    const [monthTrackers, setMonthTrackers] = useState(null)

    useEffect( () => {
        getAllMonthTrackers(user)
            .then( res => {
                setMonthTrackers(res.data.monthTrackers)
            })
            .catch(console.error)
    }, [])

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
                    <Card.Title className='m-2'></Card.Title>
                    <Card.Body>
                        <Card.Text>{monthTracker.annualIncome}</Card.Text>
                        <Card.Text>{monthTracker.monthly_savings}</Card.Text>
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