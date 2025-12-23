import { Server } from "socket.io";
import app from "./src/app.js";
import {envConfig} from "./src/config/config.js";
import connectDB from "./src/database/db.js";



// post - on
// get - emit
// request - socket
// api - event

const startServer = () => {
    connectDB();
    const port = envConfig.port || 4000
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    const io = new Server(server);
    io.on("connection", (socket) => {
        socket.on("haha", (data) => {
            console.log("Received 'haha' event with data:", data);
            socket.emit("response", { message: "Hello from server!" });1
        })
        console.log("A user connected:", socket.id)
    })
}








startServer();

