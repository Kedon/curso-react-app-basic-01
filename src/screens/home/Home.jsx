import React, { useState } from 'react';
import './home.scss';
import { Button, Table, Card, Form, Modal } from 'react-bootstrap'


const Home = () => {

    const [modal, showModal] = useState(false)

    const [fields, mudaCampo] = useState({
        name: '',
        lastName: '',
        userName: ''
    })

    const [rows, setRows] = useState([])

    function toggleModal(){
        showModal(!modal)
    }

    function changeInputField(e) {
        console.log(e)
        const { name, value } = e.target
        console.log(name, value)
        mudaCampo({
            ...fields,
            [name]: value
        })
    }

    function handleAddField() {
        console.log(fields)
    }

    return (
        <div className="home-layout">
            <Modal show={modal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name="name" type="text" value={fields.name} placeholder="Seu nome" onChange={changeInputField} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control name="lastName" type="text" value={fields.lastName} placeholder="Sobrenome" onChange={changeInputField} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>User name</Form.Label>
                        <Form.Control name="userName" type="text" value={fields.userName} placeholder="Nome de usuário" onChange={changeInputField} />
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>Close</Button>
                    <Button variant="primary"  onClick={handleAddField}>Save changes</Button>
                </Modal.Footer>
            </Modal>

            <Button variant="primary" onClick={toggleModal}>
                Abrir modal
            </Button>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Nome de Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Valdenir</td>
                        <td>Flauzino</td>
                        <td>Val</td>
                    </tr>
                </tbody>
            </Table>
            {/* <div className="content">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={require('../../assets/img/logo-og.png')} />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div> */}
            {/* <Button variant="primary">Primary</Button>{' '} */}
        </div>
    )
};

export default Home;