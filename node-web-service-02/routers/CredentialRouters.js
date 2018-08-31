const express = require('express');
const CredentialRouter = express.Router();
const CredentialService = require('../services/CredentialServices');

let credentialService = null;
const init = () => {
    credentialService = new CredentialService()
}
init();

//routing
CredentialRouter.post('/', (req,res) => {
    const data = req.body;
    let credentials = credentialService.addCredential(data);
    credentialService.writeLoaclCredFile(credentials);
    credentials ? res.status(200).json(credentials) : res.status(500).json({'error': 'Unable to register.'});
});

CredentialRouter.post('/credentialCheck', (req,res) => {
    const credData = req.body;
    const credCheck = credentialService.findUserByCred(credData);
    credCheck ? res.status(200).json(credCheck) : res.status(404).json(credCheck);
});

module.exports = CredentialRouter;