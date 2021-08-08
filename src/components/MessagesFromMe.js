import React from 'react';


const MessagesFromMe = ({userData}) => {

return (<>
<h2>My Sent Messges</h2>
                {userData.messages?.map((message) => {
                   if (message.fromUser._id===userData._id)
                   {return ( 
                   
                   <div className="messages" key={message._id}>
                         <div><b>Sender:</b> {message.fromUser.username}</div>
                         <div><b>Message:</b> {message.content}</div>
                     </div>
                     
                     
 
             )}})}
             <h2>My Recieved Messges</h2>
             {userData.messages?.map((message) => {
             if (message.fromUser._id!==userData._id)
                   {return ( 
                   
                   <div className="messages" key={message._id}>
                         <div><b>Sender:</b> {message.fromUser.username}</div>
                         <div><b>Message:</b> {message.content}</div>
                     </div>
                     
                     
                     
                     
 
            )}})}
                
             
             </>
)}
export default MessagesFromMe;