const fs = require('fs');

const usersData = fs.readFileSync('./mock-data/usersData.json');

let users = [];
exports.users = usersData;

let credentials = [];
exports.credentials = pwdData;