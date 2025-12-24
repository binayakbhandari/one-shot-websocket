import { Server } from "socket.io";
import app from "./src/app.js";
import {envConfig} from "./src/config/config.js";
import connectDB from "./src/database/db.js";

// post - on
// get - emit
// request - socket
// api - event

let io : Server | undefined
const startServer = () => {
    connectDB()
    const port = envConfig.port || 4000
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
    io = new Server(server)
}

const getSocketIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized")
    }   
    return io
}

export {getSocketIO}

startServer()