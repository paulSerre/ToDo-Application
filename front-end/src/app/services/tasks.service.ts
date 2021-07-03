import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Task } from '../models/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];
  taskSubject = new Subject<Task[]>();

  private url:string = environment.BACKEND_HTTPS_SERVER;
  private endpoint:string = "/tasks";

  constructor(private http: HttpClient) { 
    this.getTasks();
  }

  getTaskById(id: number) {
    console.log(this.tasks);
    const task = this.tasks.find(
      (s) => {
        return s.taskId === id;
      }
    );
    return task;
  } 
  
  emitTaskSubject() {
    this.taskSubject.next(this.tasks.slice());
  }

  getTasks() {
    this.http
      .get<any>(this.url+this.endpoint)
      .subscribe(
        (response) => {
          this.tasks = response;
          this.emitTaskSubject();
        },
        (error) => {
          console.log('Error ! : ' + error);
        }
      );
  }

  /**
   * 
   * @param newTask 
   * Add a task to database.
   */
  createNewTask(newTask: Task) {
    // Add to database
    this.http
      .post(this.url+this.endpoint, {
        "done": newTask.done,
        "title": newTask.title,
        "folderId": newTask.folderId
      })
      .subscribe(
        (response: Task) => {
          console.log("Successfully added.", response);
          this.tasks.push(response);
          this.emitTaskSubject();
        },
        (error) => {
          console.log("Error : ", error);
        }
      )
  }

  updateTask(newTask: Task, taskId: number) {
    // Replace in tasks list
    const elementPos = this.tasks.map(function(o) {return o.taskId; }).indexOf(taskId);
    const exTask = this.tasks[elementPos];
    this.tasks[elementPos] = Object.assign(exTask,newTask);
    // Replace in database
    this.http
      .put(this.url+this.endpoint+"/"+taskId, {
        "done": newTask.done,
        "title": newTask.title,
        "folderId": newTask.folderId
      })
      .subscribe(
        (_) => {
          console.log("Successfully modified.");
        },
        (error) => {
          console.log("Error : ", error)
        }
      )
  }

}
