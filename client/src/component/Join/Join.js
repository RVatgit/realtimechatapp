import React,{useState} from 'react';
import {Link} from "react-router-dom";
import './Join.css';

const Join=()=>{
    const [name,setname]=useState('');
    const [room,setroom]=useState('');

    return (
        <div className="joinOuterContainer">
             <div className="joinInnerContainer"> 
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(e)=>setname(e.target.value) } /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(e)=>setroom(e.target.value)} /></div>
                <Link to={`/chat/?name=${name}&room=${room}`}> 
                <button className="button mt-20 " onClick={e=>(!name||!room)?e.preventDefault():null}> Sign In </button>
                </Link> 
             </div>
        </div>
    )
}

export default Join; 
