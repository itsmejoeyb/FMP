import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CompanyCard(props) {
    return (
        <>
            <Link className="link-wrap" to={{ pathname: `/company/${props.name.replace(/ /g, "-").toLowerCase()}`, state: { id: props.id, name: props.name } }}>
                <Card id="company-card" bg="dark" text="white" className="m-auto" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={props.imageUrl} />
                    <Card.Body>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Text>
                            {!!props.desc ? props.desc : 'No description provided, edit to add one!'}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}
