import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { TodoApp } from './todo.component';
import { TodoDashboard } from './dashboard/dashboard.component';
import { TodoListDetail } from './todo-list-detail/todo-list-detail.component';

import { ListService } from './services/list.service';


@NgModule({
  declarations: [
	TodoApp,
    TodoDashboard,
    TodoListDetail
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  
  providers: [
  	ListService 
  ],
  
  bootstrap: [ TodoApp ]
})
export class AppModule { }
