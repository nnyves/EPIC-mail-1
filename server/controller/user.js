import UserModal from '../models/user';

const User = {


    createUser(req, res) {
        if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password){
            return res.status(400).send({'message': 'all fields is a must'})
        }
        const user = UserModal.createUser(req.body);
        return res.status(201).send(user);
    },


    getAllUser(req, res) {
        const users = UserModal.findAll();
        return res.status(200).send(users);
    },


    getUser(req, res) {
        const user = UserModal.findUser(req.param.id);
        if (!user){
            return res.status(404).send({'message': 'user not found'});
        }
        return res.status(200).send(user);
    },

    updateUser(req, res) {
        const user = UserModal.findUser(req.param.id);
        if(!user) {
            return res.status(404).send({'message': 'no such user'});
        }
        const updatedUser = UserModal.updateUser(req.param.id, req.body)
        return res.status(200).send(updatedUser);
    },


    deleteUser(req, res) {
        const user = UserModal.findUser(req.param.id);
        if (!user) {
            return res.res.status(404).send({'message': 'user not found'});
        }
        const del = UserModal.deleteUser(req.param.id);
        return res.status(204).send(del);
    }
}
export default User;