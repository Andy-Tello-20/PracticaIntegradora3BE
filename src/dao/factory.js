
import config from "../config/config.js"
export let DAO

//DATO IMPORTANTE "Utilizamos await en la importación (import) dinámica cuando necesitamos esperar a que el módulo se cargue completamente antes de continuar con la ejecución del código"

console.log('persistencia es: ', config.PERSISTENCE)

switch (config.PERSISTENCE) {
    case 'MONGO':

        const CartMongoDAO = (await import("./cartMongoDAO.js")).default
        DAO = CartMongoDAO
      
        break

    case "FS":

        const CartFsDAO = (await import("././cartFsDAO.js")).default
        DAO = CartFsDAO;
        break

    default:
        console.log(`Persistencia mal configurada...!!!`)
        process.exit()
        break
}