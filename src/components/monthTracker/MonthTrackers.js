import React, { useEffect, useState } from "react";
import { getAllMonthTrackers } from "../../api/monthTracker";
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { deleteMonthTracker } from "../../api/monthTracker";

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap',
    // fontFamily: 'Inter',
    marginLeft: 5,
    // width: '18rem'
}

const containerStyle = {
    position: 'absolute', 
    left: '47%', 
    top: '30%',
    transform: 'translate(-50%, -50%)',
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
        return (
            <Container style={containerStyle}>
                <br/>
                <p>You have no month trackers, yet!</p>
                <p>Create a new month tracker!</p>
                <Button variant="outline-success"><Link to='/monthTrackers/create' style={{ textDecoration: 'none', color: 'green' }}> Create Month Tracker</Link> </Button>
            </Container>
            )
    }

    let monthTrackerCards

    if(monthTrackers.length > 0) {
        monthTrackerCards = monthTrackers.map( monthTracker => {
            return (
                <>
                    <Card 
                        key={monthTracker._id}
                        // border="dark" 
                        className="m-2 monthTracker-card"
                    >
                        <Link to={`/monthTrackers/${monthTracker._id}`} style={{color: 'black', textDecoration: 'none'}}>
                            <Card.Header>
                                <h5>{monthTracker.monthTrackerTitle}</h5>
                            </Card.Header>
                        </Link>
                        {/* <Link to={`/monthTrackers/${monthTracker._id}`}>
                            <Button variant="primary" className='m-2'>View</Button>
                        </Link> */}
                        <Card.Body>
                            <Card.Text><strong>Monthly Income:</strong> ${monthTracker.monthlyTakeHome.toFixed(2)}</Card.Text>
                            <Card.Text><strong>Savings:</strong> ${monthTracker.monthly_savings}</Card.Text>
                            <Card.Text><strong>Loan repayments:</strong> ${monthTracker.monthly_loan_payments}</Card.Text>
                            <Card.Text><strong>Budget:</strong> ${monthTracker.budget}</Card.Text>
                            <Card.Text><strong>Cashlow:</strong> ${monthTracker.monthly_cashflow}</Card.Text>
                        </Card.Body>
                        <Button variant="outline-danger" className='m-2 delete-button-monthTracker' onClick={ () => deleteOneTracker(user, monthTracker._id)}><i class="material-icons">delete_forever</i></Button>
                    </Card>
                </>
            )
        })
    }

    console.log('MONTHTRACKERS: ', monthTrackers)

    return (
        <>
            <br/>
            <br/>
            <div style={cardContainerLayout}>
                {monthTrackerCards}
            </div>
            <br/>
            <Container>
                <BarChart width={730} height={250} data={monthTrackers}>
                    <XAxis dataKey="monthTrackerTitle" name={`${monthTrackers.month} ${monthTrackers.year}`} />
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="monthly_cashflow" name="Cashflow" unit="$" fill="#8884d8"/>
                    <Bar dataKey="totalExpenses" name="Expenses" fill="#82ca9d" />
                </BarChart>
            </Container>
        </>
    )
}

export default MonthTrackers