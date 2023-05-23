import messageModel from "../models/messages.js";

class messageManager {
    constructor(){

    }

    async createMessage (message){
        let result = await messageModel.create(message);
        return result;
    }

    async getMessage () {
        let result = await messageModel.find({}).lean();
        return result;
    }
}

export default messageManager