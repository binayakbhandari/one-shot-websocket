
export enum Status {
    Completed = 'completed',
    Pending = 'pending'
}


export interface ITodo {
    task : String,
    deadline : String,
    status : Status
}