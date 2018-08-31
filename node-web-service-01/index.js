"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.port || 8000;

var importedUsers = require('./mock-data/user');
var users = JSON.parse(importedUsers.users);

var importedCredentials = require('./mock-data/credential');
var credentials = JSON.parse(importedCredentials.credentials);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

class CurdOperation {
    findAllUsers() {
        return users;
    };

    findUserById(id) {
        const user = users.find(function(user){
            return user.id === id;
        });
        return user;
    };

    updateUser(id,data){
        users.forEach(element => {
            if(element.id === id) {
                element.id = data.id;
                element.first_name = data.first_name;
                element.last_name = data.last_name;
                element.email = data.email;
                element.gender = data.gender;
                element.ip_address = data.ip_address;
            }
        });
    }

    addUser(data) {
        users.push(data);
    };

    deleteUser(id) {
        var user = [];
        users.forEach(element => {
            if(element.id !== id){
                user.push(element);
            }
        });
        users = user;
    };

    writeLoaclFile(users) {
        const streamFilePath = './mock-data/usersData.json';
        const writeStream = fs.createWriteStream(streamFilePath);
        const streamData = JSON.stringify(users);
        writeStream.write(streamData, 'UTF8');
        writeStream.end();
    }
};

class credentialOperation {
    addCredential(data) {
        credentials.push(data);
    };

    findUserByCred(credData) {
        var checkResult = {"checkFlag": false};
        credentials.forEach(element => {
            if(element.username === credData.username && element.password === credData.password){
                checkResult = {
                    "checkFlag": true,
                    "username": element.username,
                    "full_name": element.full_name,
                    "email": element.email,
                    "ph_no": element.ph_no
                }
            }
        });
        return checkResult;
    };

    writeLoaclCredFile(credentials) {
        const streamFilePathCred = './mock-data/pwdData.json';
        const writeStreamCred = fs.createWriteStream(streamFilePathCred);
        const streamDataCred = JSON.stringify(credentials);
        writeStreamCred.write(streamDataCred, 'UTF8');
        writeStreamCred.end();
    };
}

const credOperation = new credentialOperation();
const curd = new CurdOperation();

app.get('/', (req,res) => res.json('Home Page'));

app.get('/api/users', (req,res) => {
    const allUsers = curd.findAllUsers();
    allUsers ? res.status(200).json(allUsers) : res.status(500).json({error: 'Users not found!'});
});

app.get('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    if(!id){
        res.status(404).json({error: 'Bad Request!'});
    }
    const user = curd.findUserById(id);
    user ? res.status(200).json(user) : res.status(404).json({error: 'user not found'});
});

app.put('/api/user/:id', (req,res) => {
    const id = parseInt(req.params.id);
    if(!id){
        res.status(404).json({error: 'Bad Request!'});
    }
    const data = req.body;
    curd.updateUser(id,data);
    curd.writeLoaclFile(users);
    users ? res.status(200).json(users) : res.status(500).json({error: 'Users not found!'});
});

app.post('/api/user', (req,res) => {
    const data = req.body;
    curd.addUser(data);
    curd.writeLoaclFile(users);
    users ? res.status(200).json(users) : res.status(500).json({error: 'Users not found!'});
});

app.delete('/api/user/:id', (req,res) => {
    const id = parseInt(req.params.id);
    if(!id){
        res.status(404).json({error: 'Bad Request!'});
    }
    curd.deleteUser(id);
    curd.writeLoaclFile(users);
    users ? res.status(200).json(users) : res.status(500).json({error: 'Users not found!'});
});

app.post('/api/credential', (req,res) => {
    const data = req.body;
    credOperation.addCredential(data);
    credOperation.writeLoaclCredFile(credentials);
    credentials ? res.status(200).json(credentials) : res.status(500).json({credentials: 'Unable to register.'});
});

app.post('/api/credentialCheck', (req,res) => {
    const credData = req.body;
    const credCheck = credOperation.findUserByCred(credData);
    credCheck ? res.status(200).json(credCheck) : res.status(404).json(credCheck);
});

app.listen(port, () => {
let dateTime = new Date();
let message = `Server is running on port: ${port},
Server started on ${dateTime}`;
console.log(message);
});