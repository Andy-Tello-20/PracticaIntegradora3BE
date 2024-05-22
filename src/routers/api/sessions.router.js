import { Router } from 'express'
import passport from 'passport'
import SessionController from '../../controllers/session.controller.js'
import {  generateToken  } from '../../utils.js'
import { UserDTO } from '../../DTO/userDTO.js'


const router = Router()

router.post('/sessions/login',SessionController.login)

router.post('/sessions/register',SessionController.register)


router.post('/sessions/recovery-password',SessionController.recoverPassword)

router.get('/sessions/current', passport.authenticate('current', { session: false }), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No estas autenticado.' })
  }else{
    console.log('req.user current es: ', req.user)
    let user = new UserDTO(req.user)
    res.status(200).json(user)
  }
  
})

router.get('/session/logout', (req, res) => {
  // Eliminar la cookie de token del cliente
  res.clearCookie('access_token')

  // Redirigir al usuario a la página de login u otra página según tu aplicación
  res.redirect('/login')
});


router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email'], session: false }))

router.get('/sessions/github/callback', passport.authenticate('github', { session: false, failureRedirect: '/login' }), (req, res) => {
  console.log('req.user github es: ', req.user)
  const token = generateToken(req.user)
  res
    .cookie('access_token', token, { maxAge: 1000 * 60 * 30, httpOnly: true })
    .redirect('/profile')
})

export default router