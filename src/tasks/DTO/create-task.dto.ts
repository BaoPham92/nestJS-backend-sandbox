import { IsNotEmpty } from "class-validator";

export class CreateTaskDTO {

    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    content: string;
}