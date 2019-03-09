import moment from 'moment';
import uuid from 'uuid';

class Email {
    /**@param {object} data */

    constructor() {
        this.emails = [];
    }

    /**@return {object} user object
     *
     */

    create(data) {
        const newEmail = {
            id: uuid.v4(),
            parentMessageId: data.parentMessageId || '',
            subject: data.subject || '',
            message: data.message || '',
            //receiver:data.receiver || '',
            status: data.status || '',
            createdOn: moment.now(),
            modifiedDate: moment.now(),
        };
        this.emails.push(newEmail);
        return newEmail;
    }


    /**
 * @param {uuid} id
 * @param {object} user object
 */
    findEmail(id) {
        return this.emails.find(email => email.id === id);
    }
    /**
    * return {object} return all users
    */

    findAll() {
        return this.emails;
    }

    /**
    * @param {uuid} id
    * @param {object} data
    */

    update(id, data) {
        const email = this.findEmail(id);
        const index = this.email.indexOf(email);
        this.emails[index].parentMessageId = data['parentMessageId'] || email.parentMessageId;
        this.emails[index].createdOn = data['createdOn']  || email.createdOn;
        this.emails[index].subject = data['subject'] || email.subject;
        this.emails[index].message = data['message'] || email.message;
        this.emails[index].receiver = data['receiver'] || email.receiver;
        this.emails[index].status = data['status'] || email.status;
        this.emails[index].modifiedDate = moment.now()
        return this.emails[index];
    }

    getStatusEmail(status) {
        return this.emails.find(stat => stat.status === status);
    }

    /**
    * @param {uuid} id
    */

    delete(id) {
        const email = this.findEmail(id);
        const index = this.emails.indexOf(email);
        this.emails.splice(index, 1);
        return {};
    }

}

export default new Email();
