import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Card, Container, Dropdown, DropdownButton, ListGroup, ButtonGroup } from 'react-bootstrap';
import { getUserAccount, updateUserAccount } from "../../api/userAccout";

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const UserAccount = (props) => {
    const [account, setAccount] = useState({savings: 0, cashlow: 0, income: 0})
    const { user, msgAlert } = props

    useEffect( () => {
        getUserAccount(user)
            .then( res => {
                console.log('RES FROM ACCOUNT: ', res.data)
                setAccount(res.data.account)
                return res
            })
            .catch(console.error)
    }, [])

    console.log('ACCOUNT: ', account)

    return (
        <Container>
            <p>Username: {user.username}</p>
            <p>Annual Income: ${account.income}</p>
            <p>Savings: ${account.savings}</p>

            <Button>
                <Link to='/change-password' style={linkStyle}>
                    Change Password
                </Link>
            </Button>
        </Container>
    )
}


export default UserAccount