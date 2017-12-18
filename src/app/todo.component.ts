import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'todo-app',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: []
})
export class TodoApp implements OnInit {
  constructor (private _router: Router) { }

  ngOnInit() { }
}