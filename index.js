import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { UserRouter } from "./user.js";

const PORT=process.env.PORT||5000;
const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();

export async function createConnection(){
    const MONGO_URL=process.env.MONGO_URI
    const client = new MongoClient(MONGO_URL);
    try{
        await client.connect();
        console.log("server got successfully connected")
        return client;

    }catch(err){
        console.log(err);
    }

}
app.use('/',UserRouter);

app.listen(PORT,()=>console.log("the server started",PORT));

app.get("/",(request,response)=>{
    response.send("welcome to PK's user management ");
});
