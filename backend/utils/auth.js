const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.info },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie("token", token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope("currentUser").findByPk(id);
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

const socketRequireAuth = (socket, next) => {
  try {
    const patternMatch = (string) =>
      string.match(/(?<=(^)token=)([a-zA-Z0-9-._]+)/);
    const token = socket.handshake.headers.cookie
      .split("; ")
      .filter(patternMatch)[0]
      .split("=")[1];
    jwt.verify(token, secret, null, async (err, payload) => {
      if (err) {
        return socket.disconnect(true);
      }

      try {
        const { id } = payload.data;
        socket.user = await User.scope("currentUser")
          .findByPk(id)
          .then((user) => user.toJSON());
      } catch (payloadErr) {
        return socket.disconnect(true);
      }

      if (!socket.user) return socket.disconnect(true);

      return next();
    });
  } catch (err) {
    return socket.disconnect(true);
  }
};

// If there is no current user, return an error
const requireAuth = [
  restoreUser,
  function (req, res, next) {
    if (req.user) return next();

    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 401;
    return next(err);
  },
];

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  socketRequireAuth,
};
