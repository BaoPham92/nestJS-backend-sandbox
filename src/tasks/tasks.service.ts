import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { QueryTaskFilter } from './DTO/query-task-filter.dto';

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

    updateTaskStatus(
        id: string,
        status: TaskStatus
    ): Task {
        const task = this.getTaskById(id);
        console.log(task, status)
        task.status = status;

        return task;
    }

    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    getAllTasks(): Task[] {
        return this.tasks
    }

    getFilteredTasks(queryTaskFilter: QueryTaskFilter): Task[] {
        const { status, search } = queryTaskFilter;

        let tasks = this.getAllTasks();

        if (status) tasks = tasks.filter(task => task.status === status);

        if (search) tasks = tasks.filter(
            task =>
                task.title.includes(search) ||
                task.content.includes(search)
        );

        return tasks;
    }

    getTaskById(id: string): Task {
        const results = this.tasks.find(task => task.id === id);

        if (!!results === false) throw new NotFoundException();
        return results;
    }
}
