import  express  from "express";
import { hasToken } from "../middlewares/user.middleware.js";
import { getProducts, createProduct} from '../Controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/',hasToken('jwt', {failureRedirect:'/login'}), getProducts);

productRouter.post('/', createProduct);


export default productRouter; 

