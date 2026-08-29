export async function getUser(token) {
  const secret = process.env.JWTSECRET;
  const user = jwt.verify(token, secret);
  return user;
}

export async function setUser(payload) {
  const secret = process.env.JWTSECRET;
  const payload = jwt.sign(payload, secret);
  return payload;
}
