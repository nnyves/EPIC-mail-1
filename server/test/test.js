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

describe("EPIC-Mail API", () => {
    it("it should display a welcome message", (done) => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                res.body.should.be.an("object");
                res.body.should.property("message").which.is.a("string");
                done();
            });
    });
});
//signup user
describe('POST/ user', () => {
    it("once fail to create User, it should show error message with status code of 400", (done) => {
        const newUser = {
            id: "",
            name: "",
            status: "200",
        };
        chai
            .request(app)
            .post("/api/v1/users")
            .send(newUser)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("error");
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("should create a new User and status code of 200", (done) => {
        chai
            .request(app)
            .post("/api/v1/users")
            .send({
                name: "",
                type: "user",
            })

            end((err, res) => {
                console.log(res.body);
                expect(res.body).to.be.an("object");
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("data");
                done();
                });
    });
});

//fetch all users
describe("GET /Users", () => {
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
//fetch all users
describe("GET /User", () => {
    it("it should fetch a specific User​", (done) => {
        chai
            .request(app)
            .get("/api/v1/user/:id")
            .end((err, res) => {
                res.body.should.property("status").eql(200);
                res.body.should.property("data").that.is.an("array");
                done();
            });
    });
});

//create email
describe("POST /email", () => {
    it("once it fails to create a new Email, it should error message with status code of 400", (done) => {
        const newEmail = {
            name: "",
            type: "400",
        };
        chai
            .request(app)
            .post("/api/v1/email")
            .send(newEmail)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("error");
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("it should create a new Email and Status code of 201", (done) => {
        chai
            .request(app)
            .post("/api/v1/email")
            /*********************************************************************************** */
            .send({
                name: "",
                type: "email"
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

//get a specific Email

describe("GET /email /<email-id>", () => {
    it("it should fetch a specific Emails​", (done) => {
        chai
            .request(app)
            .get("/api/v1/email/:id")
            .end((err, res) => {
                res.body.should.property("status").eql(200);
                res.body.should.property("data").that.is.an("array");
                done();
            });
    });
});

    /************************************************************************ */

// Update Email
describe('/Patch Email', () => {
    it('it should error message with status code of 400', (done) => {
        const id = "fake_id";
        chai
            .request(app)
            .put(`/api/v1/email/:id`)
            .send({
                name: "",
                type: "email",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
    it("it should return a specific Email", (done) => {
        const id = 1;

        chai
            .request(app)
            .get("/api/v1/emails/1")
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                res.body.should.property("status").eql(200);
                done();
            });
    });
});

// Deleting Email
describe('/Delete a Email', () => {
    it('it should error message with status code of 400', (done) => {
        const id = "fake_id";
        chai
            .request(app)
            .put(`/api/v1/email/:id`)
            .send({
                name: "",
                type: "email",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should delete  Email', (done) => {
        const id = 1;
        chai
            .request(app)
            .delete('/api/v1/email/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
