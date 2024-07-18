import UserPreference from "../../model/user-preference";
import { getCasts } from "../../utils/usersCast";

export const getRealTimeCastSocket = (io: any) => {
  io.on("connection", (socket: any) => {
    socket.on("getUserCast", async (query: { fid: string; }) => {
      try {
          const fid = query.fid;
        // Set an interval to emit the data every 5 seconds
        const intervalId = setInterval(async () => {
            try {
              const response = await getCasts(fid);
              socket.emit("userCastData", {
                success: true,
                data: {
                  response,
                },
              });
            } catch (error: any) {
              socket.emit("userCastData", {
                success: false,
                error: error.message,
              });
              clearInterval(intervalId); // Stop the interval if an error occurs
            }
          }, 5000);
  
          // Clear the interval when the client disconnects
          socket.on("disconnect", () => {
            console.log('Client disconnected');
            clearInterval(intervalId);
          });

      } catch (err: any) {
        socket.emit("userCastData", {
          success: false,
          error: err.message,
        });
      }
    });
  });
};
