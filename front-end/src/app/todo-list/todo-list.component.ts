import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Task } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  tasks: Task[];
  taskSubscription: Subscription;

  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.taskSubscription = this.taskService.taskSubject.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
    this.taskService.emitTaskSubject();
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const title = form.value['title'];
    console.log(this.tasks[this.tasks.length-1].id+1);
    const newTask = new Task(this.tasks[this.tasks.length-1].id+1,false, title);
    this.taskService.createNewTask(newTask);
  }

}
