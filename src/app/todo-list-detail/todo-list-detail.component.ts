import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Event, 
  NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Location } from '@angular/common';

import { ListService } from '../services/list.service';
import { TodoList } from '../services/list';
import { Todo } from '../services/item';

@Component({
  selector: 'app-todo-list-detail',
  templateUrl: './todo-list-detail.component.html',
  styleUrls: ['./todo-list-detail.component.css'],
  providers: [ TodoList ]
})
export class TodoListDetail implements OnInit {
  private _newList;

  todoList: TodoList;
  listName: String;
  newTodoText = '';

  private checkRoute() {
    console.log('checkingroute');
    this._route.params.subscribe(params => {
      let name = params['name'];
      console.log('found new name: ', name);
      if (name != "new") {
        this._listService.getList(name).subscribe(list => {
          this._newList = false;
          this.todoList = list;
          this.listName = this.todoList.name;
        });
      } else {
        this._newList = true;
        this.todoList = new TodoList();
        console.log('test');
        console.log(this.todoList.name);
        console.log(this.todoList.name != '');
        this.todoList.setTodos();
        this.listName = '';
      }
    });
  }

  constructor(
    private _listService: ListService, 
    private _route: ActivatedRoute, 
    private _router: Router) {

    _router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        // Could show loading indicator
        this.checkRoute();
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator
          // Present error to user
          // console.log(event.error);
      }
    });
  }

  ngOnInit() {
    this.checkRoute();
  }

  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle;
    todo.editing = false;
  }

  cancelEditingTodo(todo: Todo) {
    todo.editing = false;
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim();
    todo.editing = false;

    if (editedTitle.length === 0) {
      return this.todoList.remove(todo);
    }

    todo.title = editedTitle;
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  removeCompleted() {
    this.todoList.removeCompleted();
  }

  toggleCompletion(todo: Todo) {
    this.todoList.toggleCompletion(todo);
  }

  remove(todo: Todo){
    this.todoList.remove(todo);
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoList.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

  saveTodos() {
    console.log('saving');
    console.log(this.listName.trim().length);
    if (this.listName.trim().length) {
      if (this._newList) {
        this.listName = 'todos-list-' + this.listName;
      }
      this.todoList.saveList(this.listName);
      this._newList = false;
    }
  }

  displayName(name: String): String {
    let ret = name.substring(11);  
    return ret;
  }
}
