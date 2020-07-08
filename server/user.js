const user=[];

const addUser =({id,name,room})=>{
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();
    const existing =user.find(u=>u.room===room && u.name==name);
    if(existing) return {error :"user taken"};
    const usr={id,name,room};
    user.push(usr);
    return {usr};
}

const removeuser=(id)=>{
    const ind=user.findIndex(e=>e.id==id);
    if(ind!=-1) return  user.splice(ind,1)[0];
}

const getUser=(id)=>user[user.findIndex(e=>e.id===id)]; 


const getUsersInRoom=(room)=> user.filter(e=>e.room===room);

module.exports={user,addUser,removeuser,getUser,getUsersInRoom};