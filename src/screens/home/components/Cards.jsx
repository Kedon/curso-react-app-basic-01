import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const Cards = ({ data, handleClick }) => {
    return (
        <Card>
            <Card.Img variant="top" src={data.src} />
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>
                    {data.text}
                </Card.Text>
                <Button variant="primary" onClick={() => handleClick(data)}>Go somewhere</Button>
            </Card.Body>
        </Card>       
    );
}

export default Cards;