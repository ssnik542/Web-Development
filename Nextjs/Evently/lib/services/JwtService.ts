import jwt from "jsonwebtoken";
class JwtService {
  static sign(
    payload: string | object,
    expiry = "1y",
    secret = process.env.JWT_SECRET || ""
  ) {
    return jwt.sign(payload, secret, {
      expiresIn: expiry,
    });
  }
  static verify(payload: string, secret = process.env.JWT_SECRET || "") {
    return jwt.verify(payload, secret);
  }
}

export default JwtService;
