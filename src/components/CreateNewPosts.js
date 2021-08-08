import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from '../api';


const CreateNewPosts = ({token}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setwillDeliver] = useState(false);
    const history = useHistory();

    const postSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            url: "/posts",
            body: { post: { title:title, 
                    description:description,
                    price:price,
                    location:location ? location : "On Request",
                    willDeliver:willDeliver}},
            method: 'POST', token:token
        });
        history.push('/posts')
        window.location.reload()
    }
    return (
        <>
            <h2>Create New Post</h2>
            <form onSubmit={postSubmit}>
            <input
                    type="text"
                    placeholder="Post Name"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Post Description"
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Post Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Post Location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                ></input>
                <input
                    id = "willDeliver"
                    type="checkbox"
                    value={willDeliver}
                    onChange={(event) => setwillDeliver(event.target.value)}>
                 </input>
                <label htmlFor="willDeliver">Yes, I will deliver</label><br></br>
                
                <button type="submit">Post It Here!</button>
            </form>
            <button>
                <Link to="/">Home</Link>
            </button>
        </>
    );
};

export default CreateNewPosts;
