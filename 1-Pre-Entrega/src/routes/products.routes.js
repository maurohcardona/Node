import  express  from "express";
import { passportCall } from "../middlewares/user.middleware.js";
import { getProducts, createProduct} from '../dao/Controllers/productmanager.js';

const productRouter = express.Router();

productRouter.get('/',passportCall('jwt', {failureRedirect:'/login'}), getProducts);

productRouter.post('/', createProduct);


export default productRouter; 

