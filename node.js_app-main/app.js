const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.get('/',function(request,response){     
     response.sendFile(path.join(__dirname+'/index.html'));   
      });

// create
app.post('/insert', (request, response) => {
    const { marka } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(marka);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    console.log('test');
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id, marka } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, marka);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:marka', (request, response) => {
    const { marka } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(marka);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log('app is running'));