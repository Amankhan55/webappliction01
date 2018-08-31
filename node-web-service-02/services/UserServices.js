const fs = require('fs');
var importedUsers = require('../mock-data/user');
var users = JSON.parse(importedUsers.users);

class UserService {
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
        return users;
    }

    addUser(data) {
        users.push(data);
        return users;
    };

    deleteUser(id) {
        var user = [];
        users.forEach(element => {
            if(element.id !== id){
                user.push(element);
            }
        });
        users = user;
        return users;
    };

    writeLoaclFile(users) {
        const streamFilePath = '../node-web-service-02/mock-data/usersData.json';
        const writeStream = fs.createWriteStream(streamFilePath);
        const streamData = JSON.stringify(users);
        writeStream.write(streamData, 'UTF8');
        writeStream.end();
    }
};

module.exports = UserService;