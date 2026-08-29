import jwt from "jsonwebtoken";
export function getUser(token) {
  const secret = process.env.JWTSECRET;
  const user = jwt.verify(token, secret);
  return user;
}

export function setUser(payload) {
  const secret = process.env.JWTSECRET;
  const token = jwt.sign(payload, secret);
  return token;
}
