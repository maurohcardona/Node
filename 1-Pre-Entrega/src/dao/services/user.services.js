import userModel from "../models/users.js";
import MongoSingleton from "../../config/db.config.js";

class userService {
        constructor(){
            const db = MongoSingleton.getIstance();
        }

        getUser = async (email) => await userModel.findOne({ email: email });
}

export default userService;