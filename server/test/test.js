import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import Email from '../models/email'
import User from '../models/email'
import EmailController from '../controller/email'
import UserController from '../controller/email'

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

//signup user
describe('POST/ user', () => {
    it("once fail to create User, it should show error message with status code of 400", (done) => {
        const newUser = {
            firstName: "kagabo",
            lastName:"gagaga",
            email: "arc@gmil.com",
            password: "afuysdgu"
        };
        chai.request(app)
            .post("/api/v1/users")
            .send(newUser)
            .end((err, res) => {
                res.body.should.have.property('status');
                done();
            });

    });

    it("should create a new User and status code of 200", (done) => {
        chai
            .request(app)
            .post("/api/v1/users")
            .send({
                "firstName" : "1222",
                "lastName" : "kenny",
                "email" : "ket@andela.com",
                "password" : "000000"
            })

            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("data");
                done();
                });
    });
});

/*********************************************************** */
// login a User

describe('LOGIN / user', () => {
    it("once fail to create User, it should show error message with status code of 400", (done) => {
        const newUser = {
            "email" : "ket@andela.com"
        };
        chai.request(app)
            .post("/api/v1/login")
            .send(newUser)
            .end((err, res) => {
                res.body.should.have.property('status');
                done();
            });

    });

    it("should create a new User and status code of 200", (done) => {
        chai
            .request(app)
            .post("/api/v1/login")
            .send({
                "email" : "ket@andela.com",
	            "password" : "000000",
            })

            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("data");
                done();
            });
    });
});

/******************************************************** */

//fetch all users
describe("GET /AllUsers", () => {
    it("it should fetch all User​", (done) => {
        chai
            .request(app)
            .get("/api/v1/users")
            .end((err, res) => {
                res.body.should.property("status").eql(200);
                res.body.should.property("data").that.is.an("array");
                done();
            });
    });
});



/******************************************************************** */
/********************************************************************* 
//fetch  a specific User
describe("GET /email /<user-id>", () => {
    it("it should fetch a specific User​", (done) => {
        chai
            .request(app)
            .get("api/v1/user/b661af63-d83c-48c5-9a10-ed33ddd9c2a8")
            .end((err, res) => {
                res.body.should.property("status").eql(200);
                res.body.should.property("data").that.is.an("Array");
                done();
            });
    });
});
/********************************************************************************** */

//create email
describe("POST /email", () => {
       /* it("once fail to create Email, it should show error message with status code of 400", (done) => {
        const newEmail = {
            "parentMessageId" : "567",
            "subject" : "pooooo",
            "message" : "its me you looking for",
            "status" : "unreaded"
        };
        chai
            .request(app)
            .post("api/v1/email")
            .send(newEmail)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("error");
                expect(res.status).to.equal(200);
                done();
            });
    });*/

    it("it should create a new Email and Status code of 200", (done) => {
        chai
            .request(app)
            .post("/api/v1/email")
            .send({
                "parentMessageId" : "1234",
	            "subject" : 123,
	            "message" : " this is my new email",
	            "status" : "sent"
            })
            .end((err, res) => {
                console.log(res.body);
                expect(res.body).to.be.an("object");
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("data");
                done();
            });
    });
});

/************************************************************************** */

//get all email
describe("GET /Emails", () => {
    it("it should fetch all Emails​", (done) => {
        chai
            .request(app)
            .get("/api/v1/emails")
            .end((err, res) => {
                res.body.should.property("status").eql(200);
                res.body.should.property("data").that.is.an("array");
                done();
            });
    });
});

/**************************************************************************** */

//get a specific Email

describe("GET /email /<email-id>", () => {
    it("it should fetch a specific Emails​", (done) => {
        chai
            .request(app)
            .get("/api/v1/email/e3a8d317-fde3-4950-b507-4d590179cefc")
            .end((err, res) => {
                res.body.should.property("status").eql(200);
                res.body.should.property("data").that.is.an("Array");
                done();
            });
    });
});

/************************************************************************ */

// Update Email
describe('update /Email', () => {
    it('it should error message with status code of 404', (done) => {

        chai
            .request(app)
            .put("/api/v1/email/e3a8d317-fde3-4950-b507-4d590179cefc")
            .send({
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
    it("it should return a specific Email", (done) => {
        const id = 1;

        chai
            .request(app)
            .get("/api/v1/email/e3a8d317-fde3-4950-b507-4d590179cefc")
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                res.body.should.property("status").eql(200);
                done();
            });
    });
});

/******************************************************************************* */

// Deleting Email
describe('/Delete a Email', () => {
    it('it should delete Email', (done) => {
        const id = "fake_id";
        chai
            .request(app)
            .delete("/api/v1/email/e3a8d317-fde3-4950-b507-4d590179cefc")
            .send({
                
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    it('it should error message with status code of 400', (done) => {
        
        chai
            .request(app)
            .delete('/api/v1/email/e3a8d317-fde3-4950-b507-4d590179cefc')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
});
