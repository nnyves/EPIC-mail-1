import moment from 'moment';
import uuid from 'uuid';

class Email {
    /**@param {object} data */

    constructor() {
        this.emails = [
            
                {
                    "id": "e3a8d317-fde3-4950-b507-4d590179cefc",
                    "parentMessageId": "1234",
                    "subject": 123,
                    "message": " this is my new email",
                    "status": "sent",
                    "createdDate": "March 13, 2019",
                    "modifiedDate": "March 13, 2019"
                },
            

            
                {
                    "id": "66c81bab-7abb-43f7-94e3-9ceac96dce10",
                    "parentMessageId": "567",
                    "subject": "test",
                    "message": " this is testing email",
                    "status": "received",
                    "createdDate": "March 13, 2019",
                    "modifiedDate": "March 13, 2019"
                },
            
            
            
                {
                    "id": "2161fc38-45dd-4daf-8a52-db6f41b4e48e",
                    "parentMessageId": "567",
                    "subject": "hello",
                    "message": "its me you looking for",
                    "status": "unreaded",
                    "createdDate": "March 13, 2019",
                    "modifiedDate": "March 13, 2019"
                }
            
        ];
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
            status: data.status || '',
            createdDate: moment().format('LL'),
            modifiedDate: moment().format('LL'),
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
        this.emails[index].subject = data['subject'] || email.subject;
        this.emails[index].message = data['message'] || email.message;
        this.emails[index].status = data['status'] || email.status;
        this.emails[index].createdOn = moment().format('LL');
        this.emails[index].modifiedDate = moment().format('LL');
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
