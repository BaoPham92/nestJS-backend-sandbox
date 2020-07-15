import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './DTO/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, content } = createTaskDTO;
        
        const task: Task = {
            id: uuidv4(),
            title,
            content,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    getAllTasks(): Task[] {
        return this.tasks
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }
}
