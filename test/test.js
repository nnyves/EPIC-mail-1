import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server.js';

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

//signup user
describe('POST/ user', () => {
    it("once fail to create User, it should show error message with status code of 400", (done) => {
        chai.request(app)
            .post("/api/v1/users")
            .send({
                "firstName" : "1222",
                "lastName" : "kenny",
                "email" : "",
                "password" : "000000"
            })
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                done();
                });

    });

    it("should create a new User and status code of 200", (done) => {
        chai
            .request(app)
            .post("/api/v1/users")
            .send({
                "firstName":"snyder",
                "lastName":"andela",
                "email": "abc@gmail.com",
                "password":"abc",
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
    it("once fail to login User, it should show error message with status code of 400", (done) => {
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

    it("should login User and status code of 200", (done) => {
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


//fetch all users
describe("GET /AllUsers", () => {
    it("it should fetch all User​", (done) => {
        chai
            .request(app)
            .get("/api/v1/users")
            .end((err, res) => {
                res.body.should.property("status").eql(200);
                expect(res.body).to.have.property("data");
                res.body.should.property("data").that.is.an("array");
                done();
            });
    });
});

/** ************************************************************************************************/
//get a specific user
describe("GET /User /<user-id>", () => {


    it("it should fetch a specific User​", (done) => {
        chai
            .request(app)
            .get("/api/v1/user/df2b3988-c184-427e-8752-24bf38d865cf")
            .end((err, res) => {
                res.body.should.property("status").eql(200);
                res.body.should.property("data").that.is.an("object");
                done();
            });
    });

    it("once fail to fet user​", (done) => {
        chai
            .request(app)
            .get("/api/v1/user/23")
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                done();
            });
    });
});



//create email
describe("POST /email", () => {
    /*********************************************************************** */
    it("once fail to create User, it should show error message with status code of 400", (done) => {
        const newUser = {


        };
        chai.request(app)
            .post("/api/v1/email")
            .send(newUser)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                done();
            });

    });

    it("it should create a new Email and Status code of 200", (done) => {
        chai
            .request(app)
            .post("/api/v1/email")
            .send({
                "subject" : "request",
	            "message" : "hello there",
              	"status" : "sent",
	            "receiverid" : 24,
	            "parentmessageid" : "13",
	            "email": "abdc@gmail.com"
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
            .get("/api/v1/email/16")
            .end((err, res) => {
                res.body.should.property("status").eql(200);
                res.body.should.property("data").that.is.an("Array");
                done();
            });
    });
    it("once fail to fetch s specific email", (done) => {

        chai
            .request(app)
            .get("/api/v1/email/10")
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                done();
            });
    });
});

/************************************************************************ */
//get email by status

describe("GET /email /<email-status>", () => {
    it("once fail it should bring error od 404​", (done) => {
        chai
            .request(app)
            .get("/api/v1/email/sent")
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                done();
            });
    });
});
/*********************************************************************** */
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

//Deleting Email
describe('Delete a Email', () => {

    it('it should delete Email', (done) => {
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