import { Router } from 'express'
import CartsController from '../../controllers/cart.controller.js'

const router = Router()



router.post('/carts',CartsController.createCart )


router.get('/carts/:cid', CartsController.getCartById )


router.post('/carts/:cid/product/:pid', CartsController.addProduct)

router.post('/:cid/purchase', CartsController.purchase);

export default router