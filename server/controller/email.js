//import Email from '../models/email';
import Auth from '../helpers/user';
import { insertEmails, emailTable, groupTable, inboxTable, groupMembersTable, selectEmails } from '../Database/queries'
import Joi from 'joi';
import pg from 'pg';
import { join } from 'path';
const pool = new pg.Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/epic"
});




const EmailController = {


    create(req, res) {
        const senderId = (Auth.decode(req.headers.token));
        if (!senderId) {
            return res.status(400).send({
                status : 400,
                'message' : 'Invalid token'
            });
        }
        const schema = {
            subject: Joi.required(),
            message: Joi.required(),
            parentmessageid: Joi.number().required(),
            status: Joi.string().required(),
            receiverid: Joi.number(),
            email: Joi.required(),
        };

        const result = Joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).send(result.error.details[0].message);
        }
        pool.query(insertEmails,[
            req.body.email,
            req.body.subject,
            req.body.message,
            req.body.status,
            req.body.receiverid,
            req.body.parentmessageid,
        senderId.userId]).then(({ rows }) => {
                return res.status(200).send({
                    status : 200,
                    'message' : 'Email has been successful created',
                    data : rows
                });
            }).catch((err) => {
                console.log(err);
                return res.status(400).send({
                    status : 400,
                    'error' : 'Failed to insert the email',
                });
            });

    },

//get all emails
    getAll(req, res) {
        const user = (Auth.decode(req.headers.token));
        if (!user) {
            return res.status(400).send({
                status : 400,
                'message' : 'Invalid token'
            });
        }
        ////////////////////////////////////////////
        pool.query(`SELECT * FROM emails WHERE receiverid = $1`,[user.userId]).then( (email) => {
            console.log(email);
        //const email = Email.findAll(req, res);
        const emails = email.rows;
        if (!emails){
            return res.status(404).send({
                status : 404,
                'message': 'no email yet'
            });
        }
        return res.status(200).send({
            status : 200,
            data : [{emails}]
        });
    }).catch((err) => res.send({
        message:err
    }));
    },

    //find a specific email
    getEmail(req, res) {
        console.log(req.params.id);
        pool.query(`SELECT * FROM emails WHERE id = $1`,[req.params.id]).then( ({ rows }) => {
        //const email =
        const email = rows[0];
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
        const user = (Auth.decode(req.headers.token));
        if (!user) {
            return res.status(400).send({
                status : 400,
                'message' : 'Invalid token'
            });
        }
        ////////////////////////////////////////////
        console.log(user.userId);
        pool.query(`SELECT * FROM emails WHERE senderid = $1`,[user.userId], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    status : 400,
                    'message' : 'Error occured'
                });
            }
            console.log(data);
            let rows = data.rows;
            let emails = data.rows;
        //const email = Email.findAll(req, res);
        console.log(emails);
        if (!emails){
            return res.status(404).send({
                status : 404,
                'message': 'no email yet'
            });
        }
        return res.status(200).send({
            status : 200,
            data : rows
        });
    });
},
    //delete a specific email
    delete(req, res) {
        const user = (Auth.decode(req.headers.token));
        if (!user) {
            return res.status(400).send({
                status : 400,
                'message' : 'Invalid token'
            });
        }
        

        
        const group = pool.query('DELETE FROM emails WHERE id=$1 AND (senderid=$2 OR receiverid=$3) RETURNING *',[ req.params.id ,user.userId ,user.userId],(err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    status : 400,
                    'message' : 'Error occured'
                });
            }
            if (data.rows.length===0) {
                return res.status(400).send({
                    status : 400,
                    'message' : 'Email does not exist or not your'
                });
            }
            const group = data.rows[0];
            return res.status(200).send({
                status : 200,
                'message' : 'Email has been successful deleted'
            });
        });
    },
    /******************************************************************** */
    // groups
    // create a group
    createGroup(req, res) {
        const user = (Auth.decode(req.headers.token));
        if (!user) {
            return res.status(400).send({
                status : 400,
                'message' : 'Invalid token'
            });
        }
        const schema = {
            name: Joi.required(),
        };
        const result = Joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).send(result.error.details[0].message);
        }
        const group = pool.query('INSERT INTO groups(name, owner,createdOn) VALUES($1,$2,$3) RETURNING *',[req.body.name, user.userId, new Date()],(err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    status : 400,
                    'message' : 'Error occured'
                });
            }
            const group = data.rows[0];
            return res.status(200).send({
                status : 200,
                'message' : 'Group has been successful created',
                data : [{group}]
            });
        });
        
    },

    //find all groups
    getAllGroup(req, res) {
        const user = (Auth.decode(req.headers.token));
        if (!user) {
            return res.status(400).send({
                status : 400,
                'message' : 'Invalid token'
            });
        }
        ////////////////////////////////////////////
        console.log(user.userId);
        pool.query(`SELECT * FROM groups WHERE owner = $1`,[user.userId], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    status : 400,
                    'message' : 'Error occured'
                });
            }
            console.log(data);
            let rows = data.rows;
            let emails = data.rows;
        //const email = Email.findAll(req, res);
        console.log(emails);
        if (!emails){
            return res.status(404).send({
                status : 404,
                'message': 'no email yet'
            });
        }
        return res.status(200).send({
            status : 200,
            data : rows
        });
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
        const user = (Auth.decode(req.headers.token));
        if (!user) {
            return res.status(400).send({
                status : 400,
                'message' : 'Invalid token'
            });
        }
        const schema = {
            name: Joi.required(),
        };
        const result = Joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).send(result.error.details[0].message);
        }
        const group = pool.query('UPDATE groups SET name=$1 WHERE id=$2 AND owner=$3 RETURNING *',[req.body.name, req.params.id ,user.userId],(err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    status : 400,
                    'message' : 'Error occured'
                });
            }
            if (data.rows.length===0) {
                return res.status(400).send({
                    status : 400,
                    'message' : 'Group does not exist or not your'
                });
            }
            const group = data.rows[0];
            return res.status(200).send({
                status : 200,
                'message' : 'Group has been successful update',
                data : [{group}]
            });
        });
    },

    //delete a specific email
    deleteGroup(req, res) {
        const user = (Auth.decode(req.headers.token));
        if (!user) {
            return res.status(400).send({
                status : 400,
                'message' : 'Invalid token'
            });
        }
        

        
        const group = pool.query('DELETE FROM groups WHERE id=$1 AND owner=$2 RETURNING *',[ req.params.id ,user.userId],(err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    status : 400,
                    'message' : 'Error occured'
                });
            }
            if (data.rows.length===0) {
                return res.status(400).send({
                    status : 400,
                    'message' : 'Group does not exist or not your'
                });
            }
            const group = data.rows[0];
            return res.status(200).send({
                status : 200,
                'message' : 'Group has been successful deleted'
            });
        });
    },


}

export default EmailController;