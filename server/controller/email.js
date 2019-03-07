import EmailModel from '../models/Email';
const Email = {


    createEmail(req, res) {
        if (!req.body.subject && !req.body.message && !req.body.receiver) {
            return res.status(400).send({'message':'all field are required'})
        }
        const email = EmailModel.createEmail(req.body);
        return res.status(200).send(email);
    },


    getAllEmail(req, res) {
        const emails = EmailModel.findAll();
        return res.status(200).send(emails);
    },


    getEmail(req, res) {
        const email = EmailModel.findEmail(req.params.id);
        if (!email){
            return res.status(404).send({'message': 'email not found'});
        }
        return res.status(200).send(email);
    },


    updateEmail(req, res) {
        const email = EmailModel.findEmail(req.param.id);
        if (!email) {
            return res.status(404).send({'message': 'email not found'});
        }
        const updatedEmail = EmailModel.updateEmail(req.param.id, req.body)
        return res.status(200).send(updatedEmail);
    },

    deleteEmail(req, res) {
        if (!email) {
            return res.status(404).send({'message': 'email not found'});
        }
        const del = EmailModel.deleteEmail(req.param.id);
        return res.status(204).send(del);
    }
}

export default Email;