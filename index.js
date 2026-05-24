import express from 'express';
import { stat } from 'node:fs';

const app = express();

const user = [1,2,3,4,5];
let obj={
    name: "John Doe",
    age: 30,
    email: "johndoe@example.com"
};
const hel=["Hello","World","This","is","a","test"];
//middleware
//it's a function that runs before the actual request handler

app.get("/",(req,res)=>{
    res.status(200).send("Hello World");
});

const adminMiddleware = (req,res,next)=>{
    const isAdmin = false;
    if(isAdmin){
        next(); 
    }else{
        res.status(403).json({
            status: "fail",
            message: "You are not authorized to access this resource"
        });
    }
}

const dummyMiddleware = (req,res,next)=>{
    console.log("This is a dummy middleware");
    next();
}

app.get("/users",adminMiddleware,dummyMiddleware,(req,res)=>{
    res.status(200).json({
        status: "success",
        data: user
    });
});

app.listen(3000,()=>{
    console.log(`server is running on port 3000 http://localhost:3000`);
});
