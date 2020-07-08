const exp=require("express");
const app=exp.Router();

app.get('/',(req,res)=>{
    res.send("Running");
});

module.exports=app; 