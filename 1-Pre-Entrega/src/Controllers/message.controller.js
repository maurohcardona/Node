import * as messagesService from "../services/messages.services.js";

export const getMessages = async (req, res) => res.render("chats");

export const createMessages = async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = { user, message };
    await messagesService.createMessage(newMessage);
    res.status(200).send("Mensaje enviado");
  } catch (error) {
    log.error("No se pueden mandar los mensages", err);
    res.status(500).json({ error: err.message });
  }
};

export function handleSocketEvents(io) {
  io.on("connection", (socket) => {
    req.logger.error("New connection");

    socket.on("message", async (data) => {
      await messagesService.createMessage(data);
      const mensajes = await messagesService.getMessages();
      io.emit("messages", mensajes);
    });
  });
}
