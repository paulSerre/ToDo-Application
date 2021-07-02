import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent  {
  @Input() done: boolean;
  @Input() id: number;
  @Input() index: number;
  @Input() taskName: string;

  constructor(private taskService: TasksService) { }

  fieldsChange(values:any):void {
    this.taskService.updateTask(new Task(this.id, values.currentTarget.checked, this.taskName));
  }

}
