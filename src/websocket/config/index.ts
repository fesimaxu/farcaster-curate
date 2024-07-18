import { Server } from "socket.io";
import { getRealTimeCastSocket } from "../emitter";



const socketConfig = async (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    pingTimeout: 20000 
  });

  getRealTimeCastSocket(io);

  io.on("connection", (socket) => {
    console.log("client connected");
    socket.on("disconnect", () => {
      console.log("client disconnected");
    });
  });
};

export default socketConfig;
