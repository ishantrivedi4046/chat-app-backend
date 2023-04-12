import { jwtService } from "App/Services/JWTService";
import Ws from "App/Services/WsService";
import { SocketEvents } from "App/Socket/types";
import url from "url";
Ws.boot();

/**
 * Listen for incoming socket connections
 */
Ws.io.on(SocketEvents.CONNECT, async (socket) => {
  const { token } = url.parse(socket.request.url!, true).query;
  if (!token) {
    socket.disconnect();
  } else {
    const decodedToken = await jwtService.verify(token as string);
    const { sub: userId } = decodedToken;
    try {
      if (userId) {
      }
    } catch (e) {
      socket.disconnect();
    }
  }
});
