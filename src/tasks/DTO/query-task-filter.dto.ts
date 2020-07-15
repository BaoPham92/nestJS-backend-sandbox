import { TaskStatus } from "../task.model";

export class QueryTaskFilter {
    status: TaskStatus;
    search: string;
}