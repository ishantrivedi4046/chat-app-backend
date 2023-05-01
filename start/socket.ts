import Invitation from "App/Models/Invitation";
import User from "App/Models/User";
import { jwtService } from "App/Services/JWTService";
import { userService } from "App/Services/UserService";
import Ws from "App/Services/WsService";
import { SocketCommandHelper } from "App/Socket/commandHelpers/commandHelper";
import { ChatEvents, SocketEvents } from "App/Socket/types";
import { forEach } from "lodash";
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
        Ws.registerUser(Number(userId), socket);
        const curUser: User | null = await userService.findById(Number(userId));
        const rooms: Invitation[] = await userService.getUserGroups(curUser!);
        if (rooms.length) {
          forEach(rooms, (room) => {
            socket.join(room.room_id);
          });
        }

        socket.on(ChatEvents.PRIVATE_MESSAGE, (data) =>
          SocketCommandHelper(socket, ChatEvents.PRIVATE_MESSAGE, {
            userId: Number(userId),
            ...data,
          })
        );
      }
    } catch (e) {
      socket.disconnect();
    }
  }
});
