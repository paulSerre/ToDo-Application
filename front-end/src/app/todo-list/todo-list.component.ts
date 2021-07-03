import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Task } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {


  folderId: number;

  tasks: Task[];
  taskSubscription: Subscription;

  constructor(private taskService: TasksService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.folderId = +this.route.snapshot.params['folderId'];
    this.taskSubscription = this.taskService.taskSubject.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks.filter(t => t.folderId === this.folderId);
      }
    );
    this.taskService.emitTaskSubject();
  }


  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const title = form.value['title'];
    const newTask = new Task(false, title, this.folderId);
    this.taskService.createNewTask(newTask);
    form.reset();
  }

}
