import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private taskService: TasksService,
              private route: ActivatedRoute) { 
  }

  fieldsChange(values:any):void {
    const folderId: number = +this.route.snapshot.params['folderId'];
    this.taskService.updateTask(new Task(values.currentTarget.checked, this.taskName, folderId), this.id);
  }

  delete() {
    this.taskService.deleteTask(this.id);
  }

}
