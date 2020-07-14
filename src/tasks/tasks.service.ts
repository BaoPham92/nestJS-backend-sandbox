import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    createTask(title: string, content: string) {
        const task: Task = {
            id: uuidv4(),
            title,
            content,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    getAllTasks(): Task[] {
        return this.tasks
    }
}
