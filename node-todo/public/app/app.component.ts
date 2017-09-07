import { Component, OnInit } from '@angular/core'

import { Todo } from './todo'
import { TodoService } from './todo.service'

@Component({
  selector: 'my-app',
  template: `
    <h1>Node Todo</h1>
    <ul>
      <li *ngFor="let todo of todos">
        {{todo.todo}} - {{todo.isDone}}
      </li>
    </ul>
  `,
  providers: [TodoService]
})
export class AppComponent implements OnInit {
  todos: Todo[]
  constructor(private todoService: TodoService) { }
  getTodos(): void {
    this.todoService.getTodos().then(todos => this.todos = todos)
  }
  ngOnInit(): void {
    this.getTodos()
  }
}
