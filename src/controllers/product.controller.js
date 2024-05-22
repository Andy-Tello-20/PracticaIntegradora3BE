import ProductsMongoDAO from "../dao/productsMongoDAO.js";

export default class ProductsController {

    static getProducts = async (req, res) => {
        try {
            const products = await ProductsMongoDAO.get();
            if (!products) {
                return res.status(404).json({ error: 'No se encontraron productos' });
            }
            res.status(200).json(products);
        } catch (error) {
            console.error('Error al obtener los productos de la lista:', error);
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
    } 

    static createProduct = async (req, res) => {

        try {

            const { body } = req
            const products = await ProductsMongoDAO.create(body)

            console.log(`Producto creado correctamente (${products._id})`)

            res.status(201).json(products)

        } catch (error) {
            console.error('Error al crear el producto:', error)

            res.status(500).json({ error: 'Error al crear un producto' })
        }

    }

    static getProductById = async (req, res) => {

        try {

            const { sid } = req.params

            console.log('sid es: ', sid)

            const product = ProductsMongoDAO.getById(sid)

            if (!product) {
                throw new Error('Producto no encontrado.')
            }
            res.status(200).json(product)

        } catch (error) {
            console.error('Error al obtener el producto:', error)

            res.status(500).json({ error: 'Error al intentar obtener un producto' })
        }




    }

    static UpdateProduct = async (req, res) => {
        try {

            const { uid } = req.params
            const { body } = req
            await ProductsMongoDAO.updateOne({ _id: uid }, { $set: body })

            console.log(`Producto actualizado correctamente (${uid}) `)

            res.status(204).end()

        } catch (error) {
            console.error('Error al actualizar el producto:', error)

            res.status(500).json({ error: 'Error al actualizar el producto' })
        }
    }

    static deleteProduct = async (req, res) => {


        try {

            const { uid } = req.params

            console.log('uid ES:', uid)

            await ProductsMongoDAO.deleteById(uid)

            console.log(`Producto eliminado correctamente (${uid}) `)

            res.status(204).end()

        } catch (error) {
            console.error('Error al eliminar el producto:', error)

            res.status(500).json({ error: 'Error al eliminar el producto' })
        }



    }
}

