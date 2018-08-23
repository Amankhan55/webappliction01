const fs = require('fs');

const usersData = fs.readFileSync('./mock-data/usersData.json');
const pwdData = fs.readFileSync('./mock-data/pwdData.json');

let users = [];
exports.users = usersData;

let credentials = [];
exports.credentials = pwdData;