import Auth from '../helpers/user';
import User from '../models/user';
import Joi from 'joi';
import pg from 'pg';
import {insertUsers, selectUser} from '../Database/createTables';
//import email from '../models/email'
///import user from '../../../../andela/EPIC-mail/server/models/user'
const pool = new pg.Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/epic"
});

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
        const data = req.body;
        //const email = User.signUp(data);

        /*
        if (user) {
            return res.status(400).send({
                status : 400,
                'message' : 'this User is already registered'
            });
        }*/
        pool.query(`INSERT INTO users(
            firstname,
            lastname,
            email,
            password,
            createdon
            ) VALUES($1, $2, $3, $4 ,$5) RETURNING *`,[
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            new Date()], (err, data) => {
                if(!err){
                    const { rows } = data;
                    const token = Auth.generateToken(rows[0].id);
        const user = User.create(req.body);
        return res.status(200).send({
            status : 200,
            message : 'user has been created',
            data : [{
                token,
                //user
            }],
        });
                } else {
                    return res.status(400).send({
                        status : 400,
                        'message' : 'User could not be created'
                    });
                }
            });

        
    },

    login(req, res) {
        const data = req.body;
        pool.query(`SELECT * FROM users WHERE email = $1`,[req.body.email]).then( ({rows}) => {
        const user = rows[0];
        console.log(rows);
        if(user) {
        const token = Auth.generateToken(user.id);
            if (user.password !== req.body.password)
                return res.status(400).send({
                    status : 400,
                    'message' : 'incorrect password or email'
            });
            else{
                return res.status(200).send({
                    status : 200,
                    message : 'you have successful logged-in',
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
        }})

    },
////////////////////////////////////////////////////////////////////////////////////////////////////
    getAll(req, res) {
        pool.query(`SELECT * FROM users`).then( ({users}) => {
        //const users = User.findAll();
            return res.status(200).send({
                status : 200,
                data :users,
        });
    })
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
    }
}
export default UserController;