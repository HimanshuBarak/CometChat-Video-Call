const authRoutes = require("../api/auth/auth");
const userRoutes = require("../api/auth/user");
const meetingRoutes = require("../api/meetings/meeting");

module.exports = function ({ app, dbConn }) {
  authRoutes({ app, dbConn });
  userRoutes({ app, dbConn });
  meetingRoutes({ app, dbConn });
};