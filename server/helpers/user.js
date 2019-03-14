
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
    }
}

export default Helper;