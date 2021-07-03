import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoldersListComponent } from './folders-list/folders-list.component';
import { SingleTaskComponent } from './todo-list/single-task/single-task.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: 'folders', component : FoldersListComponent },
  { path: 'folders/:folderId', component : TodoListComponent },
  { path: 'folders/:folderId/tasks/:taskId', component : SingleTaskComponent },
  { path:'', redirectTo: 'folders', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
