export interface Task {
    id: string;
    title: string;
    content: string;
    status: TaskStatus;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}