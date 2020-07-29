import { Tarefa } from './../models/tarefa.model';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public tarefas: Tarefa[] = [];
  public titulo: String = "Minhas Tarefas";
  public formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.carregarTarefas();

    this.formulario = this.fb.group({
      tituloTarefa: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])]
    });
  }

  limparCampos() {
    this.formulario.reset();
  }

  adicionarTarefa(titulo: String) {
    let id = this.tarefas.length + 1;
    this.tarefas.push(new Tarefa(id, titulo));
    this.persistirTarefa();
    this.limparCampos();
  }

  removerTarefa(tarefa: Tarefa) {
    let index = this.tarefas.indexOf(tarefa);

    if (index !== -1) {
      this.tarefas.splice(index, 1);
      this.persistirTarefa();
    }
  }

  marcarComoConcluida(tarefa: Tarefa) {
    tarefa.feito = true;
    this.persistirTarefa();
  }

  marcarComoNaoConcluida(tarefa: Tarefa) {
    tarefa.feito = false;
    this.persistirTarefa();
  }

  persistirTarefa() {
    let dados = JSON.stringify(this.tarefas);

    localStorage.setItem("tarefasSalvas", dados);
  }

  carregarTarefas() {
    let dados = localStorage.getItem("tarefasSalvas");
    this.tarefas = dados ? JSON.parse(dados) : this.tarefas = [];
  }
}
