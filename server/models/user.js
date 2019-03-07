import moment from 'moment';
import uuid from 'uuid';

class User {
    /**@param {object} data */

    constructor() {
        this.users = [];
    }

    /**@return {object} user object
     *
     */

    createUser(data) {
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
        return newUser;
    }


    /**
 * @param {uuid} id
 * @param {object} user object
 */
    findUser(id) {
        return this.users.find(user => user.id === id);
    }
    /**
    * return {object} return all users
    */

    findAll() {
        return this.users;
    }

    /**
    * @param {uuid} id
    * @param {object} data
    */

    updateUser(id, data) {
        const user = this.findUser(id);
        const index = this.users.indexOf(user);
        this.users[index].firstName = data['firstName'] || user.firstName;
        this.users[index].lastName = data['lastName']  || user.lastName;
        this.user[index].email = data['email'] || user.email;
        this.users[index].password = data['password'] || user.password;
        this.users[index].modifiedDate = moment.now();
        return this.users[index];
    }

    /**
    * @param {uuid} id
    */

    deleteUser(id) {
        const user = this.findUser(id);
        const index = this.users.indexOf(user);
        return {};
    }

}
export default User();