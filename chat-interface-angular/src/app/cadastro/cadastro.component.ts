import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  email: string = '';
  nome: string = '';
  genero: string = '';
  foto: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(private http: HttpClient, private router: Router) {}
//
  cadastrar() {
    if (this.senha === this.confirmarSenha) {
      const usuario = {
        email: this.email,
        nome: this.nome,
        genero: this.genero,
        foto: this.foto,
        senha: this.senha,
        confirmarSenha: this.confirmarSenha
      };
      const apiUrl = 'http://localhost:8080/api/usuario/verificar-email';
      this.http.get<any>(`${apiUrl}?email=${this.email}`)
      .subscribe(
        (response) => {
          console.log('Resposta:', response);
          // Verifica se o usuário não é nulo
          if (response) {
            // Redireciona para a página inicial
            alert('Já existe um Usuário com esse email!');
          } else {
            
            this.http.post('http://localhost:8080/api/usuario', usuario)
            .subscribe(
              response => {
                alert('Dados enviados com sucesso!');
                this.router.navigate(['/login']);
              },
              error => {
                console.error('Erro ao enviar os dados:', error);
              }
            );
        
          }
        },
        (error) => {
          // Exibe mensagem de erro caso ocorra algum problema na requisição
          console.error('Erro ao verificar usuário:', error);
        }
      );


/*
      this.http.post('http://localhost:8080/api/usuario', usuario)
        .subscribe(
          response => {
            alert('Dados enviados com sucesso!');
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Erro ao enviar os dados:', error);
          }
        );*/
    } else {
      alert('As senhas não coincidem. Por favor, verifique.');
    }
  }
}
