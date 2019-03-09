import Email from '../models/email';




const EmailController = {


    create(req, res) {
        if (!req.body.subject && !req.body.message) {
            return res.status(400).send({'message':'all field are required'})
        }
        const email = Email.create(req.body);
        return res.status(200).send({
            status : 200,
            data : [{email}]
        });
    },


    getAll(req, res) {
        const email = Email.findAll(req, res);
        if (!email){
            return res.status(404).send({'message': 'no email yet'});
        }
        return res.status(200).send({
            status : 200,
            data : [{email}]
        });
    },


    getEmail(req, res) {
        const email = Email.findEmail(req.params.id);
        if (!email){
            return res.status(404).send({'message': 'email not found'});
        }
        return res.status(200).send({
            status : 200,
            data : [{email}]
        });
    },


    update(req, res) {
        const email = Email.findEmail(req.param.id);
        if (!email) {
            return res.status(404).send({'message': 'email not found'});
        }
        const updatedEmail = Email.update(req.param.id, req.body)
        return res.status(200).send({
            status : 200,
            data : [{updatedEmail}]
    });
    },

    getStatusEmail(req, res) {
        const statusEmail = Email.getStatusEmail(req.params.status);
        res.status(200).send({
            status : 200,
            data : statusEmail,
        })
    },

    delete(req, res) {
        const email = Email.findEmail(req.params.id);
        if (!email) {
            return res.status(404).send({'message': 'email not found'});
        }
        const del = Email.delete(req.params.id)
        return res.status(204).send({
            status : 204,
            message : 'message successfully deleted'
        });
    }
}

export default EmailController;