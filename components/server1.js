
const express=require('express'); 
const bodyParser = require('body-parser'); 
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const app = express(); 
const knex = require('knex')

 
const database={
  users:[
  {
    id:"123",
    name:"John", 
    email:"john@gmail.com",
    password:"cookies",
    entries:0, 
    joined: new Date()
  },
  {
    id:"124",
    name:"Jane",
    email:"jane@gmail.com",
    password:"bananas", 
    entres: 0, 
    joined: new Date() 
  }
  ], 
  login: [
  {
    id:'987',
    hash:'',
    email:'john@gmail.com'
  }
 
  ]
  
}
app.use(bodyParser.json());  //runs the body parser
app.use(cors()); //runs cors 
 
 
app.get("/", (req, res)=> {
    res.send(database.users);
  }); 
 
app.post("/signin", (req, res)=>{
 
  if(req.body.email === database.users[0].email &&
   req.body.password === database.users[0].password)
  {
    res.json('Success');
  }
  else
  {
    res.status(400).json('error logging in, check your email or password');
  }
 
});
 
app.post("/register", (req, res)=>{
  const {email, name, password} = req.body; 
 
  database.users.push({
    id:"125",
    name:name, 
    email:email, 
    password:password,
    entries:0, 
    joined: new Date()
 
  })
  res.json(database.users[database.users.length-1]); 
 
});
 
 
app.get("/profile/:id", (req, res)=>{
  const {id} = req.params; 
  let found = false; 
  database.users.forEach(user =>{
    if(user.id===id)
    {
      found = true;  
      return res.json(user);
      
    }
    
  })
  if(!found)
  {
    res.status(404).json("Not found");
  }
});
 
 
app.put("/image", (req, res)=>{
const {id} = req.body; 
  let found = false; 
  database.users.forEach(user =>{
    if(user.id===id)
    {
      found = true;
      user.entries++  
      return res.json(user.entries);
      
    }
    
  })
  if(!found)
  {
    res.status(400).json("Not found");
  }
});
 
 
// // bcrypt.hash("bacon", null, null, function(err, hash) {
// //     // Store hash in your password DB.
// // });
 
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
app.listen(3001, ()=>{
  console.log("app is running on port 3001");
});