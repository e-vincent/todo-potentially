import { Component, OnInit } from '@angular/core';

import { ListService } from '../services/list.service'
import { TodoList } from '../services/list';


@Component({
  selector: 'todo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class TodoDashboard implements OnInit {
  todoLists: Array<TodoList>;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getAllLists().subscribe(lists => {
      this.todoLists = lists
    });
  }

  displayName(name: String): String {
    let ret = name.substring(11);  
    return ret;
  }

}
