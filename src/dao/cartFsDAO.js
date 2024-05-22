import fs from "fs";
import path from 'path';
import { __dirname } from "../utils.js";

const ruta = path.join(__dirname, './dao/carrito.json');

console.log('ruta es: ', ruta);

const prueba = fs.existsSync(ruta);

console.log('prueba es: ', prueba);

export default class CartFsDAO {

    constructor() {}

    static async createCart(data) {
        const { products } = data;

        if (!products) {
            console.error('Todos los campos son obligatorios');
            return;
        }

        const existFile = await CartFsDAO.request();

        existFile.push(data);

        await CartFsDAO.saveinFile(existFile);
    }

    static async getCart() {
        const mostrarProductos = await CartFsDAO.request();
        return mostrarProductos;
    }

    static async addProductToCart(id, idProducto) {
        const NewId = id;
        const lectura = await CartFsDAO.request();

        const buscarPorID = lectura.find((i) => i.id === NewId);

        if (buscarPorID) {
            console.log("los resultados de productos existentes fueron", buscarPorID.products);

            const busqueda = buscarPorID.products.find((i) => i.product === idProducto);

            if (busqueda) {
                busqueda.quantity++;
            } else {
                buscarPorID.products.push({ product: idProducto, quantity: 1 });
            }

            await CartFsDAO.saveinFile(lectura);
            return buscarPorID.products;
        } else {
            let mensaje = "no se encontro ningun producto 😪";
            return mensaje;
        }
    }

    static async getCartById(id) {
        const NewId = id;

        console.log('El id que ingreso fue: ,', id);

        const lectura = await CartFsDAO.request();
        console.log('lectura es: ', lectura);
        const buscarPorID = lectura.find((i) => i.id === NewId);

        if (buscarPorID) {
            console.log("el producto encontrado fue:", buscarPorID);
            return buscarPorID;
        } else {
            let mensaje = "no se encontro ningun producto 😪";
            return mensaje;
        }
    }

    static async request() {
        if (!fs.existsSync(ruta)) {
            return [];
        } else {
            try {
                const content = await fs.promises.readFile(ruta, 'utf-8');
                return JSON.parse(content);
            } catch (error) {
                console.log("ha ocurrido un error", error);
            }
        }
    }

    static async saveinFile(data) {
        const content = JSON.stringify(data, null, '\t');
        try {
            await fs.promises.writeFile(ruta, content, 'utf-8');
            console.log("Se han guardado los cambios");
        } catch (error) {
            console.log("ha ocurrido un error", error);
        }
    }
}
