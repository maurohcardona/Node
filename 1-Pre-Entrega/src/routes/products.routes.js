import  express  from "express";
import { hasToken, isAdmin } from "../middlewares/user.middleware.js";
import { getProducts, createProduct, updateProduct, deleteProduct} from '../Controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/',hasToken('jwt'), getProducts);

productRouter.post('/',hasToken('jwt'), isAdmin('jwt'), createProduct);

productRouter.put('/:idProduct',hasToken('jwt'), isAdmin('jwt'), updateProduct);

productRouter.delete('/:idProduct',hasToken('jwt'), isAdmin('jwt'), deleteProduct);

export default productRouter; 

