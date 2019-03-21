

import pg from "pg";

const pool = new pg.Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/epic-mail"
});

// Conect database
pool.on("connect",(err, res) => {
    console.log("Connected")
});




/*

const truncate = () => {
    const messagesTable = "TRUNCATE table messages restart identity";
    const inboxTable = "TRUNCATE table inbox restart identity";
    const sentTable = "TRUNCATE table sent restart identity";
    const truncateTables = `${messagesTable};${inboxTable};${sentTable};`;

pool.query(`${truncateTables}`, err => {
    if(err){
        console.log(err);
    } else {
        console.log("Tables truncated");
    }
    pool.end();
    });
};
*/

    // user table
    export const usersTable = `CREATE TABLE IF NOT EXISTS
    users(
        "id" UUID PRIMARY KEY,
        "firstname" VARCHAR(100) NOT NULL,
        "lastname" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    export const insertUsers = `INSERT INTO users(
        firstname,
        lastname,
        email,
        password,
        createdon
        ) VALUES($1, $2, $3, $4)`



/********************************************************************************** */
    // message table
    export const emailTable = `CREATE TABLE IF NOT EXISTS
    emails(
        id SERIAL PRIMARY KEY,
        "subject" VARCHAR(100) NOT NULL,
        "message" VARCHAR(3000) NOT NULL,
        "status" TEXT NOT NULL,
        "receiverid" INTERGER NOT NULL,
        "parentmessageid" INTEGER DEFAULT 0,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    export const insertEmails = `INSERT INTO emails(
        subject,
        message,
        status,
        receivedid,
        parentmessageid,
        createdon
    ) VALUES($1, $2, $3, $4, $5, $6)`;

/********************************************************************************************* */
    // inbox table
    export const inboxTable = `CREATE TABLE IF NOT EXISTS
    inbox(
        id SERIAL PRIMARY KEY,
        "receiverid" INTEGER NOT NULL,
        "messageid" INTEGER NOT NULL,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;
    export const insertInbox = `INSERT INTO inbox(
        receiverid,
        messageid,
        createdon
    ) VALUES($1, $2, $3)`;


/****************************************************************************************** */
    // group table
    export const groupTable = `CREATE TABLE IF NOT EXISTS
    groups(
        id SERIAL PRIMARY KEY,
        "name" VARCHAR(600) UNIQUE NOT NULL,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`;


/*********************************************************************************** */
    // group member table
    export const groupMembersTable = `CREATE TABLE IF NOT EXISTS
        groupMembers(
        id SERIAL PRIMARY KEY,
        "userid" INTEGER NOT NULL,
        "userrole" VARCHAR(60) NOT NULL,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    export const insertGroupMembers = `INSERT INTO emails(
        userid,
        userrole,
        createdon
    ) VALUES($1, $2, $3)`;

/****************************************************************************************** */
    export const selectUsers = `SELECT * FROM users`;
    export const selectUser = `SELECT * FROM users WHERE id = $1`;

    export const selectEmails = `SELECT * FROM emails`;
    export const selectEmail = `SELECT * FROM email WHERE id = $1`;



/****************************************************************************************** */
