// db.js
const PouchDB = require('pouchdb');
const db = new PouchDB('fitness-app');

app.post('/api/users',async(req,res) =>{
  try{
    const result = await db.put(req.body);
    res.status(201).json(result);

  }
  catch{
    res.status(500).json({error:error.message});
  }
});

//Read

app.get('/api/users/:id',async(req,res) =>{
  try{
    const user = await db.get(req.params.id);
    res.status(200).json(user);
  }
  catch(error){
    res.status(404).json({error: 'User not found'});
  }
});