import messageModel from "../models/messages.js";


export const createMessage = async (message) => await messageModel.create(message);

export const getMessages = async () => await messageModel.find({}).lean();

