import SessionMongoDAO from "../dao/sessionMongoDAO.js"
import { createHash, generateToken ,isValidPassword } from '../utils.js'


export default class SessionController {

static login =  async (req, res) => {

    const { email, password } = req.body
    const user = await SessionMongoDAO.getUser(email)
  
    console.log('user desde la DB es:', user)

  
    //validacion de que exista el user (email)
    if (!user) {
  
        return res.status(404).render('error', { title: 'Hello People 🖐️', messageError: 'Usuario no registrado.' })
    }
  
  
    //por medio del modelo/esquema de SessionMongoDAO. estamos verificando que la contraseña ingresada en el Post session/login sea igual a la que existe en la base de datos cuando nos registramos (session/register)
    if (!isValidPassword(password,user.password)) {

        return res.status(401).render('error', { title: 'Hello People 🖐️', messageError: 'Correo o contraseña invalidos.' })
    }
  
    console.log('user', user)
    const token = generateToken(user)
    res
      .status(200)
      .cookie('access_token', token, { maxAge: 1000 * 60 * 10, httpOnly: true })
      .redirect('/profile')
  }


static register =  async (req, res, next) => {

    try {
  
      const { first_name, last_name, email, password, age } = req.body;
  
  
  
      if (!first_name || !last_name || !email || !password || !age) {
        return done(new Error('Todos los campos son requeridos.'));
      }
  
      const findEmail = await SessionMongoDAO.getUser( email )
  
      console.log(findEmail)
  
      if (findEmail) {
        return res.status(409).json({ error: 'Ya existe un usuario con el correo en el sistema.' });
      }
  
      const newUserRegister = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role: "user"
      }
      const newUser = await SessionMongoDAO.createUser(newUserRegister);
  
      res.status(201).redirect('/login')
    } catch (error) {
      next(error);
    }
  }


static recoverPassword = async (req, res) => {
    const { body: { email, password } } = req
    if (!email || !password) {
      //return res.status(400).json({ message: 'Todos los campos son requeridos.' })
      return res.status(400).render('error', {messageError: 'Todos los campos son requeridos.' })
    }
    const user = await SessionMongoDAO.getUser( email)
    if (!user) {
      //return res.status(401).json({ message: 'Correo o contraseña invalidos.' })
      return res.status(401).render('error', { messageError: 'Correo o contraseña invalidos.' })
    }
    user.password = createHash(password)
    await SessionMongoDAO.updateUser(email , user)
    res.status(200).redirect('/login')
  }

}