import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';



const Cards = ({ data }) => {

    return (
        <Row>
        {data.map((banana, index) => (
            <Col>
                <Card>
                    <Card.Img variant="top" src={banana.src} />
                    <Card.Body>
                        <Card.Title>{banana.title}</Card.Title>
                        <Card.Text>
                            {banana.text}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </Col>
        ))}
        </Row>
    );
}

export default Cards;