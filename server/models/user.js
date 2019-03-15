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
        return  this.users.find(user => user.email === data.email);
    }
    findUser(id) {
        return this.users.find(user => user.id === id);
    }

    findAll() {
        return this.users;
    }

}
export default new User();