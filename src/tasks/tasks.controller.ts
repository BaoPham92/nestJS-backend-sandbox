import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { QueryTaskFilter } from './DTO/query-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        return this.tasksService.deleteTaskById(id);
    }

    @Get()
    getTasks(@Query() queryTaskFilter: QueryTaskFilter): Task[] {

        if (Object.keys(queryTaskFilter).length) {
            return this.tasksService.getFilteredTasks(queryTaskFilter);
        } else return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
