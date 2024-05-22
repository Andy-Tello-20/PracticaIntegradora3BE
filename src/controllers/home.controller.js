import ProductsMongoDAO from "../dao/productsMongoDAO.js";

export default class HomeController {
    static getIndex = async (req, res) => {
        try {
            console.log('req.user', req.user)
            if (!req.user) {
                return res.redirect('/login')
            }

            const products = await ProductsMongoDAO.get()


            res.status(200).render('profile', { title: 'products', user: req.user, listProducts: products.map(p => p.toJSON()) })

        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).render('error', { error: 'Error al obtener los productos' });
        }
    }
}