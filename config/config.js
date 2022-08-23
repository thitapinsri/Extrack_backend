require('dotenv').config()
// console.log(process.env)
const config = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
    },
    client_port: process.env.CLIENT_PORT
}
module.exports = config