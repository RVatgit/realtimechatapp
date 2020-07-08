import React,{useState,useEffect} from 'react';
import querys from "query-string";
import io from "socket.io-client";
import "./Chat.css"
import InfoBar from './../InfoBar/InfoBar'
import Input from './../Input/Input'
import Messages from './../Messages/Messages'

let socket;

const Chat=({location})=>{
    const [name,setname]=useState('');
    const [room,setroom]=useState('');
    const [msg,setmsg]=useState([]);
    const [msgs,setmsgs]=useState([]);
    const ep='http://localhost:5000'
    useEffect(()=>{
        const {name,room}= querys.parse(location.search);
        socket=io.connect(ep)
        setname(name);
        setroom(room); 
        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
        });
        
        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ep,location.search])

    useEffect(()=>{
        socket.on('message',(msg)=>{
            setmsgs(msgs=>[...msgs,msg]);
        });
    },[]);

    const sendmsg=(e)=>{
        e.preventDefault();
         if(msg)
             socket.emit('sendMessage',msg,()=>setmsg(''));
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={msgs} name={name} />
                <Input msg={msg} sendMessage={sendmsg} setmsg={setmsg}  />
            </div>
        </div>
    )
}

export default Chat;
