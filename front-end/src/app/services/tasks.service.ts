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
    const task = this.tasks.find(
      (s) => {
        return s.id === id;
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
          console.log(response);
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
    this.tasks.push(newTask);
    // Add to database
    this.http
      .post(this.url+this.endpoint, {
        "id": newTask.id,
        "done": newTask.done,
        "title": newTask.title
      })
      .subscribe(
        (_) => {
          console.log("Successfully added.");
          // Update view
          this.emitTaskSubject();
        },
        (error) => {
          console.log("Error : ", error);
        }
      )
  }

  updateTask(newTask: Task) {
    // Replace in tasks list
    const elementPos = this.tasks.map(function(o) {return o.id; }).indexOf(newTask.id);
    this.tasks[elementPos] = newTask;
    // Replace in database
    this.http
      .put(this.url+this.endpoint+"/"+newTask.id, {
        "taskId": newTask.id,
        "done": newTask.done,
        "title": newTask.title
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
