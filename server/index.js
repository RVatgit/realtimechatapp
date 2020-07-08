const exp= require("express");
const app=exp();
const server=app.listen(5000);
const {addUser,removeuser,getUser,getUsersInRoom} =require('./user');
const cors= require("cors");

app.use(cors());
app.use(exp.json());

var io = require('socket.io').listen(server);


io.on('connection',socket=>{
    console.log("New con");
    socket.on('join',({name,room},cb)=>{
        const {error,usr}=addUser({id:socket.id,name,room});
        if(error) return cb(error);
        socket.emit('message',{user:'admin',text:`${usr.name}, Welcome to room ${usr.room}`});
        socket.broadcast.to(usr.room).emit('message',{user:'admin',text:`${usr.name},has joined ${usr.room}`});
        socket.join(usr.room);
        io.to(usr.room).emit('roomData',{room: usr.room,users:getUsersInRoom(usr.room)});
        cb();
    });

    socket.on('sendMessage',(msg,cb)=>{
        let usr= getUser(socket.id);
        io.to(usr.room).emit('message',{user:usr.name,text:msg});
        io.to(usr.room).emit('roomData',{room:usr.room,text:getUsersInRoom(usr.room)});
        cb();
    })

    socket.on('disconnect',()=>{
        const user= removeuser(socket.id);
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`});
        }
    });
});

app.use('/',require('./router'));
