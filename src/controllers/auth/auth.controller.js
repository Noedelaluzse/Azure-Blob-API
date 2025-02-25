import { bcryptAdapter } from "../../config/bcrypt.adapter.js";
import { JwtAdapter } from "../../config/jwt.adapter.js";
import { matchDataAdapter } from "../../config/validator.adapter.js";
import { UserModel } from "../../data/mongo/models/user.model.js";

export const register = async(req, res) => {
  try {

    req = matchDataAdapter(req); // Obtener el objeto enviado desde el Front validado

    const { phone, password } = req;

    const userOnDb = await UserModel.findOne({phone: phone});

    if (userOnDb) return res.status(400).json({message: 'User already exists'});

    const hashPassword = bcryptAdapter.hash(password);
    
    const body = {...req, password: hashPassword };

    const user = await UserModel.create(body);

    const token =  await JwtAdapter.generateToken(user.phone);
    
    const data = {
      ok: true,
      user,
      token
    };

    res.status(201).send(data);
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: 'Error creating User'});
  }
  
}

export const login = async(req, res) => {

  const { phone, password } = req.body;

  try {
     const user = await UserModel.findOne({phone: phone});

    if (!user) return res.status(401).json({message: 'Username does not exist'});

    if (!user.wasValidated) return res.status(401).json({message: 'Username does not exist'});

    const hashPassword = user.get('password')
    
    const checkPassword = await bcryptAdapter.compare(password, hashPassword);

    if (!checkPassword) return res.status(401).json({message: 'The username or password is incorrect'});

    user.set({password: undefined}, {strict: false}); // Eliminando la clave password del objeto

    const token =  await JwtAdapter.generateToken(user.id);

    const data = {
      ok: true,
      user,
      token
    }

    res.status(200).json(data);
        

  } catch(err) {
    console.log(err);
    return res.status(500).json({message: 'Error login'});
  }
  
}

export const confirmation = async(req, res) => {

  const { token } = req.params;

  if (!token) res.status(401).json({message: "No token provided"});
  
  const payload = await JwtAdapter.validateToken(token);

  if (!payload) return res.status(401).json({message: 'Error validating user'});

  try {

    const user = await UserModel.findOne({phone: payload.payload});

    if (!user) res.status(401).json({message: 'Username does not exist'});

    if (user.wasValidated) res.status(401).json({message: 'The user has already been validated '})

    await  UserModel.findByIdAndUpdate(user.id, {wasValidated: true});

    const token = await JwtAdapter.generateToken(user.id);
    res.status(200).json({message: 'User validated', token, ok: true });

  } catch(err) {
    console.log(err);
    return res.status(500).json({message: 'Error validating user'});
  }

  
}