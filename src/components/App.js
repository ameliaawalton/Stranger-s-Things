import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { callApi } from '../api';
import { AccountForm } from './';
import  CreateNewPosts  from './CreateNewPosts';
import  Post  from './Post';
import  Posts  from './Posts';
import  EditPost  from './EditPost';
import  MessagesFromMe from './MessagesFromMe';
import  Header  from './Header';



const fetchUserData = async (token) => {
    
    const { data } = await callApi({
        url: '/users/me',
        token,
    });
    
    return data;
};

const fetchPosts = async (token) => {
    const {
        data: { posts },
    } = await callApi({ url: '/posts', token})

    return posts;
}

 
const App = () => {
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);

    const isLoggedIn = userData.username !== undefined;

    const onLogOutClick = () => {
        localStorage.removeItem('st-token');
        setToken('');
        setUserData({});
    };
    
    useEffect(async () => {
        if (posts.length === 0) {
            const fetchedPosts = await fetchPosts(token);
            setPosts(fetchedPosts);
        }
    });
    
    useEffect(async () => { 
        
        if (!token) {
            setToken(localStorage.getItem('st-token'));
            return;
        }
        const data = await fetchUserData(token);
        
        setUserData(data);
    }, [token]);
    
    return (
        <>
            <Header />
            
            <Route exact path="/">
                {isLoggedIn ? (
                    <>
                        <div>Hello, {userData.username}</div>
                        <button onClick={onLogOutClick}>Log Out</button>
                    </>
                ) : (
                    <>
                        <button>
                            <Link to="/register">Register</Link>
                        </button>
                        <button>
                            <Link to="/login">Login</Link>
                        </button>
                    </>
                )}<button>
                <Link to="/posts">View All Posts</Link>
            </button>
    
                        <button>
                            <Link to="/createnewposts">Create New Posts</Link>
                        </button>
                        <button>
                            <Link to="/myposts">My Posts</Link>
                        </button>

            </Route>
            <Route exact path="/posts">
                <Posts posts={posts} token ={token}/>
            </Route>
            <Route exact path="/editpost/:postId">
                <EditPost posts={userData.posts} token={token}/>
            </Route>
            <Route exact path="/posts/:postId">
                <Post posts={posts} token ={token} />
            </Route>
            <Route exact path="/myposts">
                <Posts posts={userData.posts} token ={token} isloggedinUser = {true}/>
             <MessagesFromMe userData = {userData}/> 
             </Route>
            <Route path="/register">
                <AccountForm action="register" setToken={setToken} />
            </Route>
            <Route path="/login">
                <AccountForm action="login" setToken={setToken} />
            </Route>
            <Route path="/createNewPosts">
                <CreateNewPosts token={token} />
        </Route>
        
        </>
    );
};

export default App;

