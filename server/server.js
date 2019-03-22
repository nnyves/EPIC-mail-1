import User from './controller/user';
import Email from './controller/email';
import express from 'express';
import createtable from './Database/createTables'


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/api/v1/users', User.create);
app.post('/api/v1/login', User.login);
app.get('/api/v1/users', User.getAll);
app.get('/api/v1/user/:id', User.getUser);

app.get('/api/v1/email/sent', Email.getStatusEmail);
app.post('/api/v1/email',Email.create);
app.get('/api/v1/emails', Email.getAll);
app.get('/api/v1/email/:id', Email.getEmail);
app.put('/api/v1/email/:id', Email.update);
app.delete('/api/v1/email/:id', Email.delete);

app.post('/api/v1/groups', Email.createGroup);
app.get('/api/v1/groups', Email.getAllGroup);
app.get('/api/v1/group/:id', Email.getGroup);
app.put('/api/v1/group/:id', Email.updateGroup);
app.delete('/api/v1/group/:id', Email.deleteGroup);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export default app;