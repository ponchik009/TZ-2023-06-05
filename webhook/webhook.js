const { default: axios } = require("axios");
const express = require("express");
const useSocket = require("socket.io");
const http = require("http");

// Receive webhook
(async () => {
  try {
    // сервер
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const server = http.createServer(app);

    const PORT = process.env.PORT || 16000;

    // хранилище
    const sessions = new Map();

    // сокеты
    const io = useSocket(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      socket.on("join", ({ idInstance }) => {
        socket.join(idInstance);

        if (!sessions.has(idInstance)) {
          sessions.set(idInstance, {});
        }

        io.in(idInstance).emit("update", sessions.get(idInstance));

        console.log(sessions.get(idInstance));
      });

      socket.on("createChat", ({ phone, idInstance }) => {
        sessions.get(idInstance)[phone] = {
          contactName: phone,
          messages: [],
        };

        io.in(idInstance).emit("update", sessions.get(idInstance));

        console.log(sessions.get(idInstance));
      });

      socket.on(
        "sendMessage",
        ({ chatId, idInstance, apiTokenInstance, message }) => {
          axios
            .post(
              `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
              {
                chatId,
                message,
              }
            )
            .then(() => {
              sessions.get(idInstance)[chatId.substring(0, 11)].messages.push({
                my: true,
                text: message,
              });
              io.in(idInstance).emit("update", sessions.get(idInstance));
            });

          console.log(sessions.get(idInstance));
        }
      );
    });

    app.post("/", (req, res) => {
      const data = req.body;
      const idInstance = data.instanceData.idInstance;
      const senderPhone = data.senderData.sender.substring(0, 11);
      const senderName = data.senderData.senderName;
      const message = data.messageData.extendedTextMessageData?.text;

      if (sessions.has(idInstance)) {
        if (sessions.get(idInstance)[senderPhone]) {
          sessions.get(idInstance)[senderPhone].contactName = senderName;
          sessions.get(idInstance)[senderPhone].messages.push({
            my: false,
            text: message,
          });

          io.in(idInstance).emit("update", sessions.get(idInstance));

          console.log(sessions.get(idInstance));
        }
      }

      res.send("ababa");
    });

    server.listen(PORT, async () => {
      console.log(`Started. App listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
