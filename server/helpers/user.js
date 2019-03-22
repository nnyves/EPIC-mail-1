
import jwt from 'jsonwebtoken';
import SECRET from '../../secret';

const Helper = {


    generateToken(id) {
        const token = jwt.sign({
            userId: id
            },
        SECRET, { expiresIn: '7d' }
        );
    return token;
    },

    decode (data) {
        const token = jwt.decode(data,SECRET);
        return token;
    }
}

export default Helper;