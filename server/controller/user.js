import Auth from '../helpers/user';
import User from '../models/user';
import Joi from 'joi';

const UserController = {

    create(req, res) {

        const schema = {
            firstName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required(),
            email: Joi.string().required(),
            password: Joi.required(),
        };
        const result = Joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).send(result.error.details[0].message);
        };

        const token = Auth.generateToken(req.body.id);
        const user = User.create(req.body);
        return res.status(200).send({
            status : 200,
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

        if(user) {
            if (user.password !== req.body.password)
                return res.status(400).send({
                    status : 400,
                    'message' : 'incorrect password'
            });
            else{
                return res.status(200).send({
                    status : 200,
                    message : 'incorrect password or email',
                    token : token,
                    data : user,
                });
            }
        }
        else{
            return res.status(404).send({
                status : 404,
                'message' : 'user not registered'
            })
        }

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
                status : 404,
                'message': 'user not found'
            })
        }
        return res.status(200).send({
            status : 200,
            data :user
            });
    },


    /*

    update(res, req) {
        const user = User.findUser(req.param.id);
        if (!user) {
            return res.status(404).send({
                status : 404,
                'message': 'user not found'
            });
        }
        const schema = {
            firstName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required(),
            email: Joi.string().required(),
            password: Joi.required(),
        };
        const result = Joi.validate(req.body, schema);
 
        if (result.error) {
            return res.status(400).send(result.error.details[0].message);
        };
        return res.status(200).send({
            status : 200,
            data :users,});
    },

    delete(req, res) {
        const user = User.findUser(req.param.id);
        if (!user) {
            return res.status(404).send({
                status : 404,
                'message': 'user not found'
            })
        }
        const ref = User.delete(req.param.id);
        return res.status(200).send({
            status : 200,
            message : 'user successfully deleted',
            data : ref,
        });
    }*/
}
export default UserController;