import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private API_URL = 'http://localhost:8080/api/usuario';
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  userEmail = localStorage.getItem('userEmail');
  userFoto = localStorage.getItem('userFoto');
  userNome = localStorage.getItem('userNome');

  ngOnInit(): void {
    if (this.users.length === 0) {
      this.loadUsers();
    }
  }

  startChat(user: any): void {
    const email = user.email;
    this.router.navigate(['/chat', email]);
  }

  private loadUsers(): void {
    this.userEmail = localStorage.getItem('userEmail');

    this.http.get<any[]>(this.API_URL + '/except?email=' + this.userEmail).subscribe(users => {
      this.users = users;
      this.searchUsers(); // Executa a pesquisa inicial para exibir todos os usuários
    });
  }

  searchQuery: string = ''; // Propriedade para armazenar o termo de pesquisa
  searchedUsers: any[] = []; // Propriedade para armazenar os usuários encontrados na pesquisa

  searchUsers(): void {
    if (this.searchQuery.trim() !== '') {
      this.searchedUsers = this.users.filter(user => {
        // Realiza a comparação do termo de pesquisa com o nome ou e-mail do usuário
        const userName = user.nome.toLowerCase();
        const userEmail = user.email.toLowerCase();
        const searchTerm = this.searchQuery.toLowerCase();
        return userName.includes(searchTerm) || userEmail.includes(searchTerm);
      });
    } else {
      this.searchedUsers = this.users; // Exibe todos os usuários quando a pesquisa estiver em branco
    }
  }
}
