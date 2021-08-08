import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from '../api';

const MessageForm = ({token, postID}) => {
    const [message, setMessage] = useState('');
   

const messageSubmit = async (event) => {
    event.preventDefault();

    const data = await callApi({
        url: `posts/${postID}/messages`,
        body: { message: {
                content:message,
                }},
        method: 'POST', token
    });
    setMessage('')
}
    
return (
    <>
        <h2>Send Me A Message!</h2>
        <form onSubmit={messageSubmit}>
            <input
                type="text"
                placeholder="write a message here"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            ></input>
            
            <button type="submit">Send Message</button>
        </form>
        
        <button>
            <Link to="/">Home</Link>
        </button>
    </>
);
};

export default MessageForm;