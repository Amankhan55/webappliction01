const fs = require('fs');

const pwdData = fs.readFileSync('./mock-data/pwdData.json');

let credentials = [];
exports.credentials = pwdData;