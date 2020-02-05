const express = require('express');
const mongodb = require('mongodb');
let db;
const string = 'mongodb+srv://todoAppUser:test@123@cluster0-p7bni.mongodb.net/items?retryWrites=true&w=majority'
mongodb.connect(string, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
  db = client.db();
})

const app = express();
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({urlencoded: false}))
app.listen(3000)
app.get('/', function(req, res){
  db.collection('items').find().toArray(function(err, items){
    res.send(`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple To-Do App</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="display-4 text-center py-1">To-Do App</h1>
      
      <div class="jumbotron p-3 shadow-sm">
        <form id="createForm" method="POST" action="/create-item">
          <div class="d-flex align-items-center">
            <input id="createField" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-primary">Add New Item</button>
          </div>
        </form>
      </div>
      
      <ul id="ListContainer" class="list-group pb-5">
      
       
      </ul>      
    </div>
    
  </body>
  <script>
  let items = ${JSON.stringify(items)}
  </script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="/browser.js"></script>
  </html>`)
  })
  
})

app.post('/create-item', function(req, res){
  db.collection('items').insertOne({text: req.body.text}, function(err, info){
    res.json(info.ops[0])
  })
  
})

app.post('/update-item', function(req, res){
  db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)},{$set: {text: req.body.item}},function(){
    res.send('Success')
  })
})

app.post('/delete-item', function(req, res){
  db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, function(){
    res.send('Success')
  })
})