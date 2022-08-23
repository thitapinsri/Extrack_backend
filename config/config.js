require("dotenv").config();
// console.log(process.env)
const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  clientPort: process.env.CLIENT_PORT,
  isVercel: process.env.IS_VERCEL || false
};
module.exports = config;
