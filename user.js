import moment from 'moment';
import uuid from 'uuid';

class User {

    constructor() {
        this.users = [];
    }
    create(data) {
        const newUser = {
                id: uuid.v4(),
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                password: data.password || '',
                createdDate: moment.now(),
                modifiedDate: moment.now(),
        };
        this.users.push(newUser);
        return newUser
    }

    login(data) {
        return this.users.find(user => user.email === data.email);
    }
    findUser(id) {
        return this.users.find(user => user.id === id);
    }

    findAll() {
        return this.users;
    }

    update(id, data) {
        const user = this.findUser(id);
        const index = this.users.indexOf(user);
        this.users[index].firstName = data['firstName'] || user.firstName;
        this.users[index].lastName = data['lastName']  || user.lastName;
        this.users[index].email = data['email'] || user.email;
        this.users[index].password = data['password'] || user.password;
        this.users[index].modifiedDate = moment.now();
        return this.users[index];
    }

    delete(id) {
        const user = this.findUser(id);
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        return {};
    }
}
export default new User();