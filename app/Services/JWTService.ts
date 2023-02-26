import UnauthenticatedException from "App/Exceptions/UnauthenticatedException";
import { appKey, jwtTokenExpiry } from "Config/app";
import jwt, { JwtPayload } from "jsonwebtoken";

export type JWTSub = Record<string, any>;

class JWTService {
  public static getInstance() {
    return new JWTService();
  }

  public async sign(sub: JWTSub): Promise<string> {
    return jwt.sign(sub, appKey, {
      expiresIn: jwtTokenExpiry,
    });
  }

  public async verify(token: string): Promise<string | JwtPayload> {
    try {
      return jwt.verify(token, appKey);
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        throw UnauthenticatedException.tokenExpired();
      }
      throw UnauthenticatedException.invalidToken();
    }
  }

  public decode(token: string) {
    return jwt.decode(token);
  }
}
export const jwtService = JWTService.getInstance();
