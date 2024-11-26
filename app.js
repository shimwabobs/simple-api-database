import express from "express";
import pkg from 'pg';
import logger from "morgan";
const {Client} = pkg;
const port=3000;
const app=express();
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const pool=new Client({
    user:"postgres",
    host:"localhost",
    database:"usersdb",
    password:"shimwa@123",
    port:5432,
});

app.post("/users",async (req,res) => {
    const name=req.body.name;
    const age=req.body.age;
    try{
        const result= await pool.query("INSERT INTO users (name,age) VALUES ($1,$2) RETURNING *",[name,age]);
        res.status(201).json(result.rows[0]);
    }catch(error){
        res.status(500).json({
            error:"Error"
        })
    }
}).listen(port,"localhost",()=>{
    console.log("Works")
})
