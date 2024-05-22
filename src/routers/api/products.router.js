import { Router } from 'express'
import passport from 'passport'
import ProductsController from '../../controllers/product.controller.js'
import { authRolesMiddleware } from '../../middlewares/roleMiddleware.js'



const router = Router()

router.get('/products', ProductsController.getProducts
   )

 router.post('/products', passport.authenticate('current', { session: false, failureRedirect: '/login' }) ,authRolesMiddleware ,ProductsController.createProduct)

 router.get('/products/:sid', ProductsController.getProductById)

 router.put('/products/:uid', passport.authenticate('current', { session: false, failureRedirect: '/login' }) ,authRolesMiddleware ,ProductsController.UpdateProduct)

 router.post('/product/:uid', passport.authenticate('current', { session: false, failureRedirect: '/login' }) ,authRolesMiddleware ,ProductsController.deleteProduct)

export default router