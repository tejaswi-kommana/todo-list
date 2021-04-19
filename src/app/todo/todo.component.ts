import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import {Todo} from './../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {

  public todoList: Todo[] = [];
  public todoListChecked: Todo[] = [];
  public todoListNotChecked: Todo[] = [];

  public addTodo(form): void {
    this.todoService.addTodo(form.value.text);
    form.value.text = null;
    this.todoList = this.todoService.getTodos();
    this.todoListSplit();
  }

  public removeTodo(id: number): void{
    this.todoService.removeTodo(id);
    this.todoList = this.todoService.getTodos();
    this.todoListSplit();
  }

  public todoListSplit(): void {
    let todoList = this.todoList;
    this.todoListChecked = todoList.filter((todoList) => todoList.isChecked == true);
    this.todoListNotChecked = todoList.filter((todoList) => todoList.isChecked == false);
  }

  public toggleComplete(id: number): void{
    this.todoService.toggleComplete(id);
    this.todoList = this.todoService.getTodos();
    this.todoListSplit();
  }

  constructor(private todoService: TodoService) {
    this.todoList = this.todoService.getTodos();
    this.todoListSplit();
  }

  ngOnInit() {
  }

}
