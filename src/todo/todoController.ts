import { getSocketIO } from "../../server.js";


class Todo {
    private io = getSocketIO() 
    constructor() {
        this.io.on("connection", (socket) => {
            console.log("New client connected:", socket.id);
        });
    }
}

export default new Todo;
 