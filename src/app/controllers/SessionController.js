import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // it brings an user with this variable email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      /* sign method:
      - first param: means payload, infos that are acessiable for user, id
      is important. OBS: it`s always an object
      - second param: it`s an unique string in whole world. MD5 website generates
      a hash with a unique string you type.
      - third param: it`s a expiration time for the token. It´s mandatory.
        OBS: it`s always an object
      */
    });
  }
}

export default new SessionController();
