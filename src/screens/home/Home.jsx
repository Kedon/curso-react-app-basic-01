import React, { useState, useEffect } from 'react';
import './home.scss';
import { Button, Table, Card, Form, Modal } from 'react-bootstrap';
import moment from 'moment';
import Slider from './components/Slider';

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
            <h1>Home</h1>
            <Slider data={slider1} />
            <Slider data={slider1} />
        </div>
    )
};

export default Home;