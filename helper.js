import mongodb from "mongodb"

export async function AddUser(client,user){
    const result=await client.db("user_management").collection("users").insertOne(user);
    console.log("successfully user inserted",result);
    return result;
}

export async function GetUserBy(client,filter){
    const result=await client.db("user_management").collection("users").findOne(filter);
    console.log("successfully user data found",result);
    return result;
}


export async function getAllUser(client,filter){
    const result=await client.db("user_management").collection("users").find(filter).toArray();
    console.log("successfully all user data found",result);
    return result;
}

export async function getOneUser(client,_id){
    const result=await client.db("user_management").collection("users").findOne({_id:new mongodb.ObjectId(_id)})
    console.log("successfully user data found",result);
    return result;
}
export async function updateUser(client,_id,user){
    const result=await client.db("user_management").collection("users").updateOne({_id:new mongodb.ObjectId(_id)},{$set:user})
    console.log("successfully user data got deleted",result);
    return result;
}

export async function DeleteUser(client,_id){
    const result=await client.db("user_management").collection("users").deleteOne({_id:new mongodb.ObjectId(_id)})
    console.log("successfully user data got deleted",result);
    return result;
}