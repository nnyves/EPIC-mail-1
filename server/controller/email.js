import Email from '../models/email';
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
        const email = Email.create(req.body);
        return res.status(200).send({
            status : 200,
            'message' : 'Email has been successfull created',
            data : [{email}]
        });
    },


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

    /*//find email for a sender only
    getEmailSender(req, res) {
        const sender = Email.findSender(req.param.senderId);
        if (!sender){
            return res.status(404).send({
                status : 404,
                'message': 'email not found'
            });
        }
        return res.status(200).send({
            status : 200,
            data : [{sender}]
        });
    },

    //find email for receiver only
    getEmailReceiver(req, res) {
        const receiver = Email.findReceiver(req.param.receiverId);
        if (!receiver){
            return res.status(404).send({
                status : 404,
                'message': 'email not found'
            });
        }
        return res.status(200).send({
            status : 200,
            data : [{receiver}]
        });
    },
    */


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
        if (statusEmail){
            return res.status(404).send({
                status : 200,
                data : [{statusEmail}]
            });
        }
        return res.status(200).send({
            status : 404,
            'message' : 'this is not email'
        })
    }
    /*delete Email
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
    }*/
}

export default EmailController;