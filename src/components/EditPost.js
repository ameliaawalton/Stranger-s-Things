import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { callApi } from '../api';

const EditPost = ({posts, token}) => {
const { postId } = useParams();

if (posts?.length === 0) return null;

let postToRender = posts?.find((post) =>  postId === post._id);

    
    const [title, setTitle] = useState(postToRender?.title);
    const [description, setDescription] = useState(postToRender?.description);
    const [price, setPrice] = useState(postToRender?.price);
    const [location, setLocation] = useState(postToRender?.location);
    const [willDeliver, setwillDeliver] = useState(postToRender?.willDeliver);
    const history = useHistory( );

    const editPost = async (event) => {
        event.preventDefault();
       
        const data = await callApi({
            url: `/posts/${postToRender._id}`,
            body: { post: { title:title, 
                    description:description,
                    price:price,
                    location:location ? location : "On Request",
                    willDeliver:willDeliver}},
            method: 'PATCH', token:token
        }); 
        history.push('/posts')
        window.location.reload()
        
    } 
    
    if (postToRender) {
        return (
        <>
            <h2>Edit Post</h2>
            <form onSubmit={editPost}>
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
            <button>
                <Link to="/">EditPost</Link>
            </button>
        </>
    )}
    else {
        return <div>Cannot Retrieve Post Right Now</div>
    }
};

export default EditPost;
