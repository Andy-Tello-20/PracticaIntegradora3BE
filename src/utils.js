import path from 'path';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import JWT from 'jsonwebtoken';
import config from './config/config.js';


const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (bodyPassword, passwordDB) => bcrypt.compareSync( bodyPassword, passwordDB);

 const jwt_secret = config.jwtSecret

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    email: user.email,
    age:user.age,
  };
  return JWT.sign(payload, jwt_secret, { expiresIn: '10m' });
};

