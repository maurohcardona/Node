import messageModel from "../models/messages.js";
import MongoSingleton from "../../config/db.config.js";

class messagesService {
    constructor(){
        const db = MongoSingleton.getIstance();
    }

    createMessage = async (message) => await messageModel.create(message);

    getMessages = async () => await messageModel.find({}).lean();
}

export default messagesService;