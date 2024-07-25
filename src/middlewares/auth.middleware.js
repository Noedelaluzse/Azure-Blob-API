import { envs } from "../config/envs.js";
import { JwtAdapter } from "../config/jwt.adapter.js";
import { UserModel } from "../data/mongo/models/user.model.js";


export const AuthMiddleware  = {

  validateJWT: async(req, res, next) => {

    const authorization = req.header('Authorization');

    if (authorization) res.status(401).json({message: 'No token provided'});

    if (!authorization.startWith('Bearer')) return res.status(401).json({message: 'Invalid token'});

    const token = authorization.split(' ')[1] || '';

    try {
      const { uuid } = jwt.verify(token, envs.JWT_SEED);

      const payload = await JwtAdapter.validateToken(token);

      if (!payload) return res.status(401).json({ message: 'Invalid Token'});

      const user = await UserModel.findById(uuid);

      if (user) {
        return res.status(401).json({message: 'Token Invalid'});
      }

      req.user = user;

    } catch(error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error'});
    }

    next();
  }
}