import mongoose from 'mongoose';
import config from './config.js';
import log from '../logs/devlogger.js';

const mongodb = config.db.dbconnection;

const conection = async () => {
    try {
        const conn = await mongoose.connect(mongodb,{
                            dbName: 'ecommerce', 
                            });
        log.http("Coneccion establecida correctamente: ");
    } catch (e) {
        log.error("Error: ", e);
    }
}


export default conection;