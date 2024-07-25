
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export const bcryptAdapter = {

  hash: (password) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  },
  compare: async(password, hash) => {
    return await compareSync(password, hash);
  }
}