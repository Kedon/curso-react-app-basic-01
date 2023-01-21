import React, { useState, useEffect } from 'react';
import './home.scss';
import { Button, Table, Card, Form, Modal } from 'react-bootstrap';
import moment from 'moment';
import Slider from './components/Slider';
import Cards from './components/Cards';
import { Row, Col } from 'react-bootstrap';
import Avatar from '../../components/avatar/Avatar';
import UserInfo from '../../components/userInfo/UserInfo';
import { Phone } from 'react-feather';
import axios from 'axios';

const slider1 = [
    {
        src: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg',
        alt: 'First slide',
        title: 'First slide label',
        caption: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
        src: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg',
        alt: 'Second slide',
        title: 'Second slide label',
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        src: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg',
        alt: 'Third slide',
        title: 'Third slide label',
        caption: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }
]

const cards = [
    {
        src: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg',
        title: 'First slide label',
        text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
        src: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg',
        title: 'Second slide label',
        text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
        src: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg',
        title: 'Third slide label',
        text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
        src: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg',
        title: 'Forth slide label',
        text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }
]

const selectOptions = [
    { value: 'Brasil', label: 'Brasil' },
    { value: 'Canadá', label: 'Canadá' },
    { value: 'Reuno Unido', label: 'Reuno Unido' },
]


const Home = () => {
    const [modal, showModal] = useState(false)

    const [fields, changeFields] = useState({
        id: null,
        date: '',
        name: '',
        lastName: '',
        userName: '',
        country: ''
    })

    const [rows, setRows] = useState([])

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

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setRows(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])


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

    function handleUpdateField() {
        //fields
        console.log(fields)
        setRows(ro => ro.map(item => {
            if (item.id === fields.id) {
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

    function onClickOnButton(info) {
        alert(JSON.stringify(info))
    }


    const data = [
        {
            name: 'Valdenir Flauzino',
            description: 'valdenir@kedon.com.br',
            level: 'Administrador',
        },
        {
            name: 'Heydion',
            description: 'heydion@kedon.com.br',
            level: 'Manager',
        }
    ]

    return (
        <div className="home-layout">
            <h1>Home</h1>
            {rows/*.slice(0, 4)*/.filter(f => f.id < 10 ).map((item, index) => 
                <UserInfo name={item.name} description={item.email} />    
            )}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Username</th>
                        <th scope="col">Website</th>
                        <th scope="col">Company</th>
                        <th scope="col">City</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index) =>
                    <tr>
                        <td scope="col">{item.name}</td>
                        <td scope="col">{item.email}</td>
                        <td scope="col">{item.phone}</td>
                        <td scope="col">{item.username}</td>
                        <td scope="col">{item.website}</td>
                        <td scope="col">{item.company.name}</td>
                        <td scope="col">{item.address.street}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            <Slider data={slider1} />
            <div className="mt-4 mb-4">
                <Row>
                    {cards.slice(0, 4).map((card, index) => (
                        <Col key={index}>
                            <Cards data={card} handleClick={onClickOnButton} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
};

export default Home;