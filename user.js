import { createConnection } from "./index.js";
import express from "express";
import { AddUser,GetUserBy,getAllUser,getOneUser,DeleteUser,updateUser} from "./helper.js";


const router=express.Router();

router.route("/user").post(async (request,response) =>{
    try{
    const {name,email,mobile}=request.body;
    const client = await createConnection();
    const userEmail=await GetUserBy(client,{email})
    
    const userNumber=await GetUserBy(client,{mobile})
    if(userEmail && userNumber){
    response.send({message:"email id and mobile number already exist"});
    }
    else if(userEmail)
    {
        response.send({message:"email id already exist"});
    }
    else if(userNumber){
        response.send({message:"mobile number already exist"});
    }
    else{
    const addUser = await AddUser(client,{name,email,mobile})
    response.send({message:"user got added",name:name} );
    }
    }
    catch(err){
        console.log(err);
        response.send({message:err} );
    }

    
})

router.route("/users").get(async (request,response)=>{
    try{
    const client=await createConnection();
    const userList= await getAllUser(client,{});
    response.send(userList);
    }
    catch(err){
        console.log(err);
        response.send({message:err} );
    }
    
})

router.route("/user/:_id").get(async (request,response)=>{
    try{
    const _id=request.params._id;
    const client=await createConnection();
    const findUser= await getOneUser(client,_id);
    response.send(findUser);
    }
    catch(err){
        console.log(err);
        response.send({message:err} );
    }
    
}).put(async (request,response)=>{

    try{
        const id=request.params._id;
        const {name,email,mobile}=request.body;
        const client = await createConnection();
        const Email=await GetUserBy(client,{email})
        
        const Number=await GetUserBy(client,{mobile})
        console.log(typeof(Email._id.toString()));
        console.log(typeof(id.toString()))
        if( (Email !== null) && (Email._id.toString() !== id.toString() )&& (Number!== null) && (Number._id.toString() !== id.toString()) ){
            response.send({message:"email id and mobile number already exist"});
            }
        
        else if((Email !== null) && (Email._id.toString() !== id.toString() ))
        {
            
            response.send({message:"email id already exist"});
        }
        else if((Number!== null) && (Number._id.toString() !== id.toString()) ){
            
            response.send({message:"mobile number already exist"});
        }
        else{
        const addUser = await updateUser(client,id,{name,email,mobile})
        response.send({message:"user data got updated",name:name} );
        }
        }
        catch(err){
            
            console.log(err);
            response.send({message:err} );
        }
    
    
    
}).delete(async (request,response)=>{
    try{
    const _id=request.params._id;
    const client=await createConnection();
    const deleteuser= await DeleteUser(client,_id);
    response.send(deleteuser);
    }
    catch(err){
        console.log(err);
        response.send({message:err} );
    };
});


export const UserRouter=router;