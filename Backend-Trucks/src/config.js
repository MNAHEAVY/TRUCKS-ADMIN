const { config } = require("dotenv");
config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://mnaheavy_db_user:sJFRrQQQktwc7TvY@cluster0.u19s1iu.mongodb.net"
module.exports = {
  PORT,
  MONGODB_URI,
};
