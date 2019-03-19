

import pg from "pg";

const pool = new pg.Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/epic"
});

// Conect database
pool.on("connect",(err, res) => {
    console.log("Connected")
});




const drop = () => {
    const usersTable = "DROP TABLE IF EXISTS users CASCADE";
    const messagesTable = "DROP TABLE IF EXISTS messages CASCADE";
    const inboxTable = "DROP TABLE IF EXISTS inbox CASCADE";
    const groupsTable = "DROP TABLE IF EXISTS groups CASCADE";
    const groupMemberTable = "DROP TABLE IF EXISTS groupMembers CASCADE";
    const resetCode = "DROP TABLE IF EXISTS resetCode CASCADE";
    const dropTables = `${usersTable};${messagesTable};${inboxTable};${groupsTable};${groupMemberTable}`;

pool.query(`${dropTables}`, err => {
    if(err){
        console.log(err);
    } else {
        console.log("All database tables have been dropped successfully!");
    }
    pool.end();
    });
};

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

const create = () => {
    // user table
    const usersTable = `CREATE TABLE IF NOT EXISTS
    users(
        "id" UUID PRIMARY KEY,
        "firstname" VARCHAR(100) NOT NULL,
        "lastname" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    // message table
    const emailTable = `CREATE TABLE IF NOT EXISTS
    emails(
        id SERIAL PRIMARY KEY,
        "subject" VARCHAR(100) NOT NULL,
        "message" VARCHAR(3000) NOT NULL,
        "status" TEXT NOT NULL,
        "receiverid" INTERGER NOT NULL,
        "parentmessageid" INTEGER DEFAULT 0,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    // inbox table
    const inboxTable = `CREATE TABLE IF NOT EXISTS
    inbox(
        id SERIAL PRIMARY KEY,
        "receiverid" INTEGER NOT NULL,
        "messageid" INTEGER NOT NULL,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    // group table
    const groupTable = `CREATE TABLE IF NOT EXISTS
    groups(
        id SERIAL PRIMARY KEY,
        "name" VARCHAR(600) UNIQUE NOT NULL,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`;

    // group member table
    const groupMembersTable = `CREATE TABLE IF NOT EXISTS
        groupMembers(
        id SERIAL PRIMARY KEY,
        "userid" INTEGER NOT NULL,
        "userrole" VARCHAR(60) NOT NULL,
        "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

const migrationQueries = `${usersTable}`;
    pool.query(`${migrationQueries}`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Database migration successfully executed!");
        }
        pool.end();
    });
};

export { drop, create, truncate, pool };

// eslint-disable-next-line eol-last
require("make-runnable/custom")({
    printOutputFrame: false
});