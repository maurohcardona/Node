import {fileURLToPath} from 'url';
import { dirname } from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`${__dirname}/Public/uploads`)
    },
    filename:function(req,file,cb){
        console.log(file);
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({storage,onError:function(err,next){
    console.log(err);
    next();
}});

export const publics = path.join(__dirname, 'Public');

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)


