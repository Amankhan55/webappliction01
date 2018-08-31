const fs = require('fs');
var importedCredentials = require('../mock-data/credential');
var credentials = JSON.parse(importedCredentials.credentials);

class CredentialService {
    addCredential(data) {
        credentials.push(data);
        return credentials;
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
        const streamFilePathCred = '../node-web-service-02/mock-data/pwdData.json';
        const writeStreamCred = fs.createWriteStream(streamFilePathCred);
        const streamDataCred = JSON.stringify(credentials);
        writeStreamCred.write(streamDataCred, 'UTF8');
        writeStreamCred.end();
    };
}

module.exports = CredentialService;