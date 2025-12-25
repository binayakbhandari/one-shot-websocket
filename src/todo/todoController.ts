import type { Socket } from "socket.io";
import { getSocketIO } from "../../server.js";
import todoModel from "./todoModel.js";


class Todo {
    private io = getSocketIO()
    constructor() {
        this.io.on("connection", (socket: Socket) => {
            console.log("New client connected:", socket.id)
            socket.on("addTodo", (data) => this.handleAddTodo(socket, data))
        })
    }
    private async handleAddTodo(socket: Socket, data: any) {
        try {
            const { task, deadline, status } = data
            await todoModel.create({
                task,
                deadline,
                status
            })
            const todos = await todoModel.find()
            socket.emit("todos_updated", {
                status: "success",
                data: todos
            })
        } catch (error) {
            socket.emit("todos_updated", {
                status: "error",
                error
            })
        }
    }
}

export default new Todo;
 