import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import Post from './Post';


const Posts = ({ posts,token }) => {
          
        const history=useHistory();
        const [searchQuery, updateSearchQuery] = useState('')
        let postsToDisplay = 
        searchQuery.length > 0
        ? posts.filter((post) => postMatches(post, searchQuery))
        : posts
        return (
        <>
        <h2 id="poststitle">Posts</h2>
            <h2>Search</h2>
            <input type = "text" value = {searchQuery} onChange = {(event) => {
                updateSearchQuery(event.target.value)
            }}/>
            

            {postsToDisplay?.map((post) => (
                
                <div key={post._id} style={{ border: '1px solid black' }}>
                        <Post posts={posts} token= {token} post={post} isloggedinUser = {true}/>
                    <button>
                        <Link to={`/posts/${post._id}`}>View Post</Link>
                    </button>
                    <button>
                        <Link to="/">Home</Link>
                    </button>
                    
                </div>
            ))}
        </>
    );
};


function postMatches(post, text) {
    
    const searchTerm = text.toLowerCase()
    const {
        description,
        location,
        title,
        author:
        {username},
        price
    } = post

    const toMatch = [description, location, title, username, price] 
    for (const field of toMatch){
        if (field.toLowerCase().includes(searchTerm)) {
            return true
        }
    }
    return false

  
 
   
}





export default Posts;