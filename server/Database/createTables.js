import pg from 'pg'
import { usersTable, emailTable, groupTable, inboxTable, groupMembersTable } from './queries'
const pool = new pg.Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/epic"
});
class create {
    constructor(){
        pool.connect((err) => {

            //execute user table queries
            pool.query(usersTable).then((res) => {
                console.log("User table created successful")
            }).catch((err) => {
                pool.end();
                console.log(err)
            })


            //execute email table queries
            pool.query(emailTable).then((res) => {
                console.log("Email table created successful")
            }).catch((err) => {
                pool.end();
                console.log(err)
            })

            //execute group table queries
            pool.query(groupTable).then((res) => {
                console.log("Group table created successful")
            }).catch((err) => {
                pool.end();
                console.log(err)
            })

            //execute inbox table queries
            pool.query(inboxTable).then((res) => {
                console.log("inbox table created successfuly")
            }).catch((err) => {
                pool.end();
                console.log(err)
            })

            //execute group Members Table queries
            pool.query(groupMembersTable).then((res) => {
                console.log("group Members Table table created successfuly")
            }).catch((err) => {
                pool.end();
                console.log(err)
            })

        })
    }
}
export default new create();