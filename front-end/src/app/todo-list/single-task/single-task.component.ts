import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit, OnDestroy {
  
  taskSubscription: Subscription;
  currentTask: Task;

  constructor(private tasksService: TasksService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['taskId'];
    this.taskSubscription = this.tasksService.taskSubject.subscribe(
      (tasks: Task[]) => {
        this.currentTask = tasks.find(t => t.taskId === id);
      }
    );
    this.tasksService.emitTaskSubject();
  }

  ngOnDestroy():void {
    this.taskSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.currentTask.title = form.value['title'];
    this.tasksService.updateTask(this.currentTask, this.currentTask.taskId);
    this.tasksService.emitTaskSubject();
    this.location.back();
  }
}
