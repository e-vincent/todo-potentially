import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TodoList } from './list';
import { Todo } from './item';

@Injectable()
export class ListService {

  constructor() { }

  getList(name: String): Observable<TodoList> {
    let list = new TodoList();
    list.setName(name);
    list.setTodos();
    return of(list);
  }

  getAllLists(): Observable<Array<TodoList>> {
    let todoLists = new Array<TodoList>();
    // get all relevant localStorage items
    let keys = Object.keys(localStorage);

    keys.forEach((item) => {
      if (item.indexOf('todos-list-') >= 0) {
        let list = new TodoList();
        list.setName(item);
        list.setTodos();
        todoLists.push(list)
      }
    });
    return of(todoLists);
  }

}
