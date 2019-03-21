import Email from '../models/email';
import { usersTable, emailTable, groupTable, inboxTable, groupMembersTable } from './queries'
import Joi from 'joi';




const EmailController = {


    create(req, res) {

        const schema = {
            subject: Joi.required(),
            message: Joi.required(),
            parentMessageId: Joi.number().required(),
            status: Joi.string().required(),
        };
        const result = Joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).send(result.error.details[0].message);
        }
        //const email = Email.create(req.body);
        return res.status(200).send({
            status : 200,
            'message' : 'Email has been successfull created',
            data : [{email}]
        });
    },

//get all emails
    getAll(req, res) {
        const email = Email.findAll(req, res);
        if (!email){
            return res.status(404).send({
                status : 404,
                'message': 'no email yet'
            });
        }
        return res.status(200).send({
            status : 200,
            data : [{email}]
        });
    },

    //find a specific email
    getEmail(req, res) {
        const email = Email.findEmail(req.params.id);
        if (!email){
            return res.status(404).send({
                status : 404,
                'message': 'email not found'
            });
        }
        return res.status(200).send({
            status : 200,
            data : [{email}]
        });
    },

    //update a specific email
    update(req, res) {
        const email = Email.findEmail(req.param.id);
        if (!email) {
            return res.status(404).send({
                status : 404,
                'message': 'email not found'
                });
        }
        const updatedEmail = Email.update(req.param.id, req.body)
        return res.status(200).send({
            status : 200,
            'message' : 'updated successfull',
            data : [{updatedEmail}]
    });
    },
    //getting email by status
    getStatusEmail(req, res) {
        const statusEmail = Email.getStatusEmail(req.params.status);

        if (statusEmail.status === "sent"){

        if (statusEmail){
            return res.status(404).send({
                status : 200,
                data : [{statusEmail}]
            });
        }
        return res.status(200).send({
            status : 404,
            'message' : 'this is not email'
        });
    }
},
    //delete a specific email
    delete(req, res) {
        const email = Email.findEmail(req.params.id);
        if (!email) {
            return res.status(404).send({
                status : 404,
                'message': 'email not found'
                })
        }
        const del = Email.delete(req.params.id)
        return res.status(200).send({
            status : 200,
            message : 'message successfully deleted'
        });
    },
    /******************************************************************** */
    // groups
    // create a group
    createGroup(req, res) {

        const schema = {
            subject: Joi.required(),
            message: Joi.required(),
        };
        const result = Joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).send(result.error.details[0].message);
        }
        const group = Group.create(req.body);
        return res.status(200).send({
            status : 200,
            'message' : 'Group has been successful created',
            data : [{group}]
        });
    },

    //find all groups
    getAllGroup(req, res) {
        const group = Group.findAll(req, res);
        if (!group){
            return res.status(404).send({
                status : 404,
                'message': 'no group yet'
            });
        }
        return res.status(200).send({
            status : 200,
            data : [{group}]
        });
    },

    // get a  specific group
    getGroup(req, res) {
        const group = Group.findEmail(req.params.id);
        if (!group){
            return res.status(404).send({
                status : 404,
                'message': 'group not found'
            });
        }
        return res.status(200).send({
            status : 200,
            data : [{group}]
        });
    },

    updateGroup(req, res) {
        const group = Group.findEmail(req.param.id);
        if (!group) {
            return res.status(404).send({
                status : 404,
                'message': 'group not found'
                });
        }
        const updatedGroup = Group.update(req.param.id, req.body)
        return res.status(200).send({
            status : 200,
            'message' : 'Group updated successful',
            data : [{updatedGroup}]
    });
    },

    //delete a specific email
    deleteGroup(req, res) {
        const group = Group.findEmail(req.params.id);
        if (!email) {
            return res.status(404).send({
                status : 404,
                'message': 'Group not found'
                })
        }
        const del = Group.delete(req.params.id)
        return res.status(200).send({
            status : 200,
            message : 'Group successfully deleted'
        });
    },


}

export default EmailController;