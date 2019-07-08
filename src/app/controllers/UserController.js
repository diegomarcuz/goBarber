import User from '../models/User';

class UserController {
  async store(req, res) {
    //console.log(req.body.email);
    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const { id, name, email } = await User.create(req.body);

      return res.json({ id, name, email });
    } catch (error) {
      return res.status(400).json({ error: 'Impossible to create an User' });
    }
  }
}

export default new UserController();
