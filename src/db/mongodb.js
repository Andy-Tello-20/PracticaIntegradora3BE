

import mongoose from "mongoose"
import config from "../config/config.js"

const URI = config.mongoDbUri

export const init =async () => {
    try {
        await mongoose.connect(URI)
        console.log('Database connected successfuly')
    } catch (error) {
        console.error('Ha ocurrido un error al intentar conectarse',error.message)
    }
}