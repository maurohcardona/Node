import ticketsModel from "../models/tickets.model.js";

export const createTicket = async(ticket) => await ticketsModel.create(ticket);