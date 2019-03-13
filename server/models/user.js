import moment from 'moment';
import uuid from 'uuid';

class User {

    constructor() {
        this.users = [
            {
                "id": "df2b3988-c184-427e-8752-24bf38d865cf",
                "firstName": "abc",
                "lastName": "xyz",
                "email": "xyz@andela.com",
                "password": "pppp",
                "createdDate": "March 13, 2019",
                "modifiedDate": "March 13, 2019"
            },
            
            {
                "id": "b661af63-d83c-48c5-9a10-ed33ddd9c2a8",
                "firstName": "123",
                "lastName": "098",
                "email": "098@andela.com",
                "password": "000",
                "createdDate": "March 13, 2019",
                "modifiedDate": "March 13, 2019"
            }
        ];
    }
    create(data) {
        const newUser = {
                id: uuid.v4(),
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                password: data.password || '',
                createdDate: moment().format('LL'),
                modifiedDate: moment().format('LL'),
        };
        this.users.push(newUser);
        return newUser
    }
    
    login(data) {
        return this.users.find(user => user.email === data.email && user.password === data.password);
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
        this.users[index].modifiedDate = moment().format('LL');
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