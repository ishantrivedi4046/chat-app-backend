import { Server, Socket } from "socket.io";
import AdonisServer from "@ioc:Adonis/Core/Server";

class Ws {
  public io: Server;
  private booted = false;

  private userSocketMapping: Record<string, Socket[]> = {};
  private socketToUserMapping: Record<string, number> = {};

  public boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return;
    }

    this.booted = true;
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: "*",
      },
    });
  }

  public getUserIdBySocket(socketId: string) {
    return this.socketToUserMapping[socketId];
  }

  public getUserSocket(userId: string): Socket[] {
    return this.userSocketMapping[userId];
  }

  public registerUser(userId: number, socket: Socket) {
    const prevSockets = this.userSocketMapping[userId];
    this.userSocketMapping[userId] = [...prevSockets, socket];
    this.socketToUserMapping[socket.id] = userId;
  }
}

export default new Ws();
