import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {

  currentTask: Task;

  constructor(private tasksService: TasksService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['taskId'];
    console.log(id);
    this.currentTask = this.tasksService.getTaskById(+id);
  }

  onSubmit(form: NgForm) {
    this.currentTask.title = form.value['title'];
    console.log(this.currentTask);
    this.tasksService.updateTask(this.currentTask, this.currentTask.taskId);
    this.tasksService.emitTaskSubject();
  }
}
