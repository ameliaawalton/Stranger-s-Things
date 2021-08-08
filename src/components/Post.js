import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import MessageForm from './MessageForm';
import { callApi } from '../api';


const Post = ({ posts, post, token, isloggedinUser }) => {
    const { postId } = useParams();

    if (posts.length === 0) return null;

    let postToRender;

    if (post) {
        postToRender = post;
    } else {
        postToRender = posts.find((post) => {
            
            return postId === post._id
        });
    }

    const history=useHistory();

    const deletePost = async (event) => {event.preventDefault()
        const data = await callApi({ url: `/posts/${postToRender._id}`,
        method: "DELETE", token})
        history.push(`/`)
        window.location.reload()
    
    
    }

    if (postToRender) {
    return (
        <div className="post">
            <h2>{postToRender.title}</h2>
            {postToRender.author.username
            ?
            <div><b>Submitted by:</b> {postToRender.author.username}</div>
        :
        null}
           
            <div><b>Description:</b> {postToRender.description}</div>
            <div><b>Price:</b> {postToRender.price}</div>
            <div><b>Location:</b> {postToRender.location}</div>
            <div><b>Delivers:</b> {postToRender.willDeliver ? 'Yes' : 'No'}</div>
            {!post ? <Link to="/posts">Back to all posts</Link> : null}
            {postToRender.isAuthor
            ?
            <>
            <button onClick={deletePost}>
                    DELETE
                    </button>
                    <button>
                        <Link to={`/editpost/${postToRender._id}`}>Edit Post</Link>
                    </button>
                    </>
            : null}
            
            {postToRender.isAuthor || isloggedinUser
            ? postToRender.messages.map((message) => {
                   
                return ( 
                  
                <div className="messages" key={message._id}>
                        <div><b>Sender:</b> {message.fromUser.username}</div>
                        <div><b>Message:</b> {message.content}</div>
                    </div>
                )
            })
                    :

                <MessageForm postID = {postToRender._id} token = {token}></MessageForm>}
                </div> 
            );
        } else {
            return <div>Cannot Retrieve Post Right Now</div>
        }
        };

export default Post;