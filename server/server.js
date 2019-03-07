import User from './controller/user';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/api/v1/users', User.createUser);
app.put('/api/v1/users/:id', User.updateUser);
app.delete('/api/v1/users/:id', User.deleteUser);

const port = process.env.Port || 5000;

app.listen(port, () => {
    console.log(`Server started on port`);
});