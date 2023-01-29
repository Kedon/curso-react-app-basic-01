import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '../../components/avatar/Avatar';
import './posts.scss';
import PostComments from './componets/PostComments';
import {  Modal, Button } from 'react-bootstrap';


const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [fields, setFields] = useState({
        title: '',
        body: ''
    });
    const [postToEdit, setPostToEdit] = useState(null);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            setPosts(res.data)
        }).catch(err => {
            console.log(err)
        })

        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            setUsers(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, []);


    const userData = (id) => {
        const user = users.find( f => f.id === id);
        return <div className="post-user">
            <div className="user-avatar">
                <Avatar name={user.name} />
            </div>
            <div className="user-info">
                <h4>{user.name}</h4>
                <small>{user.username}</small>
            </div>
        </div>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFields({
            ...fields,
            [name]: value
        })
    }

    const loadPostCommnets = (id) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(res => {
            setComments([...comments, ...res.data])
        }).catch(err => {
            console.log(err)
        })
    }

    const postComment = () => {
        const params = {
            ...fields,
            userId: 1
        }

        axios.post('https://jsonplaceholder.typicode.com/posts', params)
        .then(res => {
            setPosts([res.data, ...posts])
            setFields({
                title: '',
                body: ''
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const handleToggleEditPost = (post) => {
        setPostToEdit( prevState => !prevState ? post : null);
    }

    return (
        <div>
            
            <div className="create-post">
                <input placeholder="Título do post" value={fields.title} name="title" onChange={handleInputChange} />
                <textarea placeholder="conteúdo do post" value={fields.body} name="body" onChange={handleInputChange}></textarea>
                <button onClick={postComment}>Publicar</button>
            </div>
            {posts.map(post => 
                <div key={post.id} className="posts-ui">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    {userData(post.userId)}
                    <PostComments 
                        comments={comments.filter( f => f.postId === post.id)}
                        id={post.id}
                        handleClick={loadPostCommnets}
                    />
                    <button onClick={() => handleToggleEditPost(post)}>Editar</button>
                    <button>Excluir</button>
                </div>
            )}
            <Modal show={postToEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar comentário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {JSON.stringify(postToEdit)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleToggleEditPost}>Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default Posts;