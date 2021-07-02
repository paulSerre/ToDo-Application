import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleTaskComponent } from './todo-list/single-task/single-task.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'tasks', pathMatch:'full'},
  { path: 'tasks', component : TodoListComponent},
  { path: 'tasks/:id', component : SingleTaskComponent},
  { path: '', component : TodoListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
