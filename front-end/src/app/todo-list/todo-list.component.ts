import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Folder } from '../models/folder.model';

import { Task } from '../models/task.model';
import { FoldersService } from '../services/folders.service';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {


  currentFolder: Folder;
  folderSubscription: Subscription

  tasks: Task[];
  taskSubscription: Subscription;

  constructor(private taskService: TasksService,
              private folderService: FoldersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const folderId = +this.route.snapshot.params['folderId'];
    this.folderSubscription = this.folderService.folderSubject.subscribe(
      (folders: Folder[]) => {
        this.currentFolder = folders.find(f => f.folderId === folderId);
      }
    );
    this.folderService.emitFolderSubject();

    this.taskSubscription = this.taskService.taskSubject.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks.filter(t => t.folderId === folderId);
      }
    );
    this.taskService.emitTaskSubject();
  }


  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
    this.folderSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const title = form.value['title'];
    const newTask = new Task(false, title, this.currentFolder.folderId);
    this.taskService.createNewTask(newTask);
    form.reset();
  }

}
