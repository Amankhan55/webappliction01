"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = require('./routers/UserRouters');
const fs = require('fs');
const app = express();
const port = process.env.port || 8000;

var importedCredentials = require('./mock-data/credential');
var credentials = JSON.parse(importedCredentials.credentials);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
        const streamFilePathCred = '../mock-data/pwdData.json';
        const writeStreamCred = fs.createWriteStream(streamFilePathCred);
        const streamDataCred = JSON.stringify(credentials);
        writeStreamCred.write(streamDataCred, 'UTF8');
        writeStreamCred.end();
    };
}

app.get('/', (req,res) => res.json('Home Page'));

app.use('/api/users', UserRouter);

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