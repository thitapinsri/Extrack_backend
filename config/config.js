require("dotenv").config();
// console.log(process.env)
const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  clientPorts: [
    process.env.CLIENT_LOCAL_PORT,
    process.env.CLIENT_VERCEL_1,
    process.env.CLIENT_VERCEL_2
  ],
  isVercel: process.env.IS_VERCEL || false,
  oneDay: 1000 * 60 * 60 * 24,
  secret: "wertyui;,lkjhgtyukhlkhl",

};
module.exports = config;
