import {cartService}  from "../services/CartServices.js";

export default class CartsController {



    static createCart = async (req, res) => {

        try {
            const newCart = {
                products: []
            }

            const response = await cartService.create(newCart)

            res.status(201).json(response)

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }


    }

    static getCartById = async (req, res) => {

        try {
            const idcart = req.params.cid
    
            if (idcart) {
    
    
                const showCart = await cartService.findCart(idcart)

                if (!showCart) {
                    throw new Error('Producto no encontrado.');
                }

    
                res.status(201).json(showCart)
    
            } else {
                res.send({ error: 'No se proporcionó un PID válido' })
            }
    
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }
    
    }

    static addProduct = async (req, res) => {

        try {
            const carritoId = req.params.cid
            const productoId = req.params.pid

            console.log('carritoId y productoId son: ', carritoId, productoId)
    
            const productoEncontrado = await cartService.addProduct(carritoId,productoId)
    
            res.status(200).json(productoEncontrado)
            
    
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }
    }

    static purchase = async (req, res) => {
            try {
                const cartId = req.params.cid;
                console.log('cartId es: ', cartId)

                const compra = await cartService.ticket(cartId)
                
               
                
                

                res.json({ message: 'Purchase successful', compra });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }


    

}