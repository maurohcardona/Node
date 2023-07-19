import mongoose from 'mongoose';
import config from './config.js';

const mongodb = config.db.dbconnection;

const conection = async () => {
    try {
        const conn = await mongoose.connect(mongodb,{
                            dbName: 'ecommerce', 
                            });
        console.log("Coneccion establecida correctamente: ");
    } catch (e) {
        console.log("Error: ", e);
    }
}


export default conection;