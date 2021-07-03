import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SingleTaskComponent } from './todo-list/single-task/single-task.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FoldersListComponent } from './folders-list/folders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    SingleTaskComponent,
    FoldersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
