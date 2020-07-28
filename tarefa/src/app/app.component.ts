import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public tarefas: any[] = [];

  constructor() {
    this.tarefas.push("tarefa1");
    this.tarefas.push("tarefa2");
    this.tarefas.push("tarefa3");
  }
}
