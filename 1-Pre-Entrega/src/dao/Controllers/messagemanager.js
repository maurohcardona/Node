import messagesService from "../services/messages.services.js"

const messagesDB = new messagesService();

export const getMessages = async (req, res) => res.render('chats');

export const createMessages = async (req, res) => {
    try {
        const {user, message} = req.body
        const newMessage = {user, message}
        await messagesDB.createMessage(newMessage);
        res.status(200).send('Mensaje enviado')
    } catch (error) {
        console.error('No se puede mandar el mensaje', error);
    }
};

export function handleSocketEvents(io) {
    io.on('connection', socket => {
      console.log('New connection');
  
      socket.on('message', async data => {
        await messagesDB.createMessage(data);
        const mensajes = await messagesDB.getMessages();
        io.emit('messages', mensajes);
      });
    });
  }

