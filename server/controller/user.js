
import Auth from '../helpers/user';
import User from '../models/user';

const UserController = {

    create(req, res) {
        if (!req.body.firstName && !req.body.lastName && !req.body.email) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        const token = Auth.generateToken(req.body.id);
        const user = User.create(req.body);
        return res.status(201).send({
            status : 201,
            message : 'user has been created',
            data : [{
                token,
                user
            }],
        });
    },

    login(req, res) {
        const data = req.body;
        const token = Auth.generateToken(req.body.email);
        const user = User.login(data);
        if(!user) {
            return res.status(400).send({'message' : 'user not registered'})
        }
        return res.status(200).send({
            status : 200,
            message : 'you have successfully logged in',
            token : token,
            user : user,
        });
    },


    getAll(req, res) {
        const users = User.findAll();
        return res.status(200).send({
            status : 200,
            data :users,
        });
    },

    getUser(req, res) {
        const user = User.findUser(req.params.id);
        if (!user) {
            return res.status(404).send({
                'message': 'user not found'
            });
        }
        return res.status(200).send({
            status : 200,
            data :users,});
    },


    update(res, req) {
        const user = User.findUser(req.param.id);
        if (!user) {
            return res.status(404).send({
                'message': 'user not found'
            });
        }
        return res.status(200).send({
            status : 200,
            data :users,});
    },

    delete(req, res) {
        const user = User.findUser(req.param.id);
        if (!user) {
            return res.status(404).send({
                'message': 'user not found'
            });
        }
        const ref = User.delete(req.param.id);
        return res.status(204).send({
            status : 204,
            message : 'user successfully deleted',
            data : ref,
        });
    }
}
export default UserController;