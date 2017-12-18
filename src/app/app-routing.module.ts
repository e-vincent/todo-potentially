import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoDashboard } from './dashboard/dashboard.component';
import { TodoListDetail } from './todo-list-detail/todo-list-detail.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TodoDashboard },
  { path: 'list/:name', component: TodoListDetail }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}