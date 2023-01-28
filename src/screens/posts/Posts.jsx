import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '../../components/avatar/Avatar';
import './posts.scss';


const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [fields, setFields] = useState({
        title: '',
        body: ''
    });

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

    const postComments = (id) => {
        const commet = comments.filter( f => f.postId === id);
        return  <div className="post-comments-container">
                    {commet.length === 0 ?
                    <div class="see-commets" onClick={() => loadPostCommnets(id)}>
                        Ver comemrtários
                    </div> :
                    <div className="post-comments">
                    {commet.map(c =>
                        <div key={c.id} className="post-comment">
                            <h5>{c.name}</h5>
                            <p>{c.body}</p>
                            <small>{c.email}</small>
                        </div>
                    )}
                    </div>
            }
                    
                    
                </div>;
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
                    {postComments(post.id)}
                </div>
            )}
        </div>
    );

}

export default Posts;