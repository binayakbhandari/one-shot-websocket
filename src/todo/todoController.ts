import type { Socket } from "socket.io";
import { getSocketIO } from "../../server.js";
import todoModel from "./todoModel.js";
import type { ITodo } from "./todoTypes.js";
import { Status } from "./todoTypes.js";


class Todo {
    private io = getSocketIO()
    constructor() {
        this.io.on("connection", (socket: Socket) => {
            console.log("New client connected:", socket.id)
            socket.on("addTodo", (data) => this.handleAddTodo(socket, data))
            socket.on("getTodo", (data) => this.handleGetTodo(socket))
            socket.on("deleteTodo", (data) => this.handleDeleteTodo(socket, data))
            socket.on("updateTodoStatus", (data) => this.handleUpdateTodo(socket, data))
        })
    }
    private async handleAddTodo(socket: Socket, data: ITodo) {
        try {
            const { task, deadline, status } = data
            await todoModel.create({
                task,
                deadline,
                status
            })
            const todos = await todoModel.find({status: Status.Pending})
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

    private async handleGetTodo(socket: Socket) {
        try {
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

    private async handleDeleteTodo(socket: Socket, data: { id: string }) {
        try {
            const {id} = data
            const deletedTodo = await todoModel.findByIdAndDelete(id)
            if (!deletedTodo) {
                socket.emit("todos_updated", {
                    status: "error",
                    message: "Todo not found",
                })
                return
            }
            const todos = await todoModel.find({status: Status.Pending})
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

    private async handleUpdateTodo(socket: Socket, data: { id: string, status: Status }) {
        try {
            const { id, status } = data
            const todo = await todoModel.findByIdAndUpdate(id, { status })
            if (!todo) {
                socket.emit("todos_updated", {
                    status: "error",
                    message: "Todo not found",
                })
                return
            }
            const todos = await todoModel.find({status: Status.Pending})
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

export default new Todo();
 