import mongoose from 'mongoose';
import config from './config.js';

const mongodb = config.db.dbconnection;

export default class MongoSingleton {
    static #instance;

    constructor() {
        mongoose.connect(mongodb,{
                 dbName: 'ecommerce', 
               });
    }

    static getIstance() {
        if(this.#instance) {
            console.log('Already connected!');
            return this.#instance;
        }

        this.#instance = new MongoSingleton();
        console.log(`Connected`);
        return this.#instance;        
    }
}