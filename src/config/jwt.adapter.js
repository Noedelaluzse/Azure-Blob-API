import jwt from 'jsonwebtoken';
import { envs } from './envs.js';

export const JwtAdapter = {

  generateToken: (payload, duration = '2h') => {
    const JWT_SEED = envs.JWT_SEED;
    
    return new Promise((resolve, reject) => {
      jwt.sign({ payload }, envs.JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  },

  validateToken: (token) => {
    const JWT_SEED = envs.JWT_SEED;
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    })
  }
}