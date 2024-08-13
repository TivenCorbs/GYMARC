const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


//Middleware
app.use(bodyParse.json());
app.use(express.static(path.join(__dirname,'/Users/tivenp/Desktop/COMSCI 326/Gym Arc Project/src/frontend/Fitness Resouces/pages')));

//routes
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/Users/tivenp/Desktop/COMSCI 326/Gym Arc Project/src/frontend/Fitness Resouces/pages/homepage.html'));

});
//CRUD API
app.post('/api/data'), async (req,res) =>{
    try{
        const response = await db.post();
        res.status(201).json(response);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

app.get('/api/data',async(req,res) =>{
    try{
        const response = await db.allDocs({include_docs: true});
        res.status(200).json(response.rows.map(row => row.doc));
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});
//updates
app.put('/api/data/:id', async (req,res) =>{
    try{
        const doc = await db.get(req,params.id);
        const response = await db.put()
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
} );
//Deletes
app.delete('/api/data/:id', async (req,res) =>{
    try{
        const doc = await db.get(req,params.id);
        const response = await db.put()
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});

app.use((err,req,res,next) =>{
    console.error(err.stack);
    res.status(500).end("Something not working!")
});

//Start Server
app.listen(port, () =>{
    console.log(`Server is runnning on port ${port}`);
});