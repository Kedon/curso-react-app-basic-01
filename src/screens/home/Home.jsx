import React, { useState, useEffect } from 'react';
import './home.scss';
import { Button, Table, Card, Form, Modal } from 'react-bootstrap';
import moment from 'moment';

const selectOptions = [
    { value: 'Brasil', label: 'Brasil' },
    { value: 'Canadá', label: 'Canadá' },
    { value: 'Reuno Unido', label: 'Reuno Unido' },
]


const Home = () => {

    const initialData = localStorage.getItem('people') ? JSON.parse(localStorage.getItem('people')) : []

    const [modal, showModal] = useState(false)

    const [fields, changeFields] = useState({
        id: null,
        date: '',
        name: '',
        lastName: '',
        userName: '',
        country: ''
    })

    const [rows, setRows] = useState(initialData)

    useEffect(() => {
        if (!modal) {
            changeFields({
                id: null,
                date: '',
                name: '',
                lastName: '',
                userName: '',
                country: ''
            })
        }
    }, [modal])


    function toggleModal() {
        showModal(!modal)
    }

    function changeInputField(e) {
        const { name, value } = e.target
        changeFields({
            ...fields,
            [name]: value
        })
    }

    function handleAddField() {
        const id = (Math.random() + 1).toString(36).substring(7);
        let newData = {
            ...fields,
            date: moment().format('DD/MM/YYYY HH:mm'),
            id: id,
            active: true
        }

        setRows([...rows, newData])
    }

    function handleUpdateField(){
        //fields
        console.log(fields)
        setRows(ro => ro.map( item => {
            if(item.id === fields.id){
                item = fields
            }
            return item
        }))
        toggleModal()
    }

    function handleEdit(item) {
        toggleModal()
        changeFields(item)
    }


    function handleDelete(index) {
        setRows(rows.filter((item, i) => i != index))
    }

    return (
        <div className="home-layout">
            <h1>Na próxima aula, ensinar o conceito de atualização</h1>
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

                    <Form.Select aria-label="Default select example" name="country" onChange={changeInputField} value={fields.select}>
                        <option>Selecione um país</option>
                        {selectOptions.map(item =>
                            <option key={`option_${item.value}`} value={item.value}>{item.label}</option>
                        )}
                    </Form.Select>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>Close</Button>
                    {fields.id ? <Button variant="secondary" onClick={handleUpdateField}>Update changes</Button>
                    : <Button variant="primary" onClick={handleAddField}>Save changes</Button>}
                </Modal.Footer>
            </Modal>

            <Button variant="primary" onClick={toggleModal}>
                Abrir modal
            </Button>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Data</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Nome de Usuário</th>
                        <th>Select</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index) =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>{item.name}</td>
                            <td>{item.lastName}</td>
                            <td>{item.userName}</td>
                            <td>{item.country}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(index)}>
                                    Apagar
                                </Button>
                                <Button variant="success" onClick={() => handleEdit(item)}>
                                    Editar
                                </Button>
                            </td>
                        </tr>
                    )}
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