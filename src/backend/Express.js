const express = require('express');
const bodyParse = require('body-parser');

const app = express();
app.use(bodyParse.json());


const user = [
    {username: 'user1',password:'password123'},
    {username: 'user2',password:'password456'}
];

app.post('/login',(req,res) =>{
    const{username,password} = req.body;


    const user = users.find(u => u.username === username && u.passwor ===password);
    if(user){
        res.json({success:true});
    }
    else{
        res.json({success: false, message: 'Invalid username or password'});
    }
});

//Start Server
app.listen(port, () =>{
    console.log(`Server is runnning on port ${port}`);
});