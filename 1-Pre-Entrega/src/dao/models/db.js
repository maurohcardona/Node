import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://maurohcardona:${dbPassword}@mauroc.dilwd5c.mongodb.net/?retryWrites=true&w=majority`,{
    dbName: 'ecommerce', 
  });
  



const db = mongoose.connection;


db.on('error', console.error.bind(console, 'Error to connect MongoDB:'));
db.once('open', () => {
  console.log('Connection succesfully to  MongoDB');
});

export default  db;