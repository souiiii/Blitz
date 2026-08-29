import { getUser } from "../services/auth";

async function authSoft(req, res, next) {
  req.user = null;
  const token = req.cookies?.token;

  if (!token) return next();

  try {
    const user = await getUser(token);
    req.user = user;
    return next();
  } catch (err) {
    res.clearCookie();
    return res.status(401).json({ err: "Invalid user" });
  }
}

async function authHard(req, res, next) {
  if (!req.user) return res.status(401).json({ err: "Unauthenticated user" });

  return next();
}

export { authHard, authSoft };
