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

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

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
    });
  }

  searchQuery: string = ''; // Propriedade para armazenar o termo de pesquisa
  searchedUsers: any[] = []; // Propriedade para armazenar os usuários encontrados na pesquisa
  
  searchUsers(): void {
    // Implemente a lógica para realizar a pesquisa de usuários com base no termo searchQuery
    // Por exemplo, você pode chamar um serviço HTTP para fazer a consulta no backend
  
    // Supondo que você obtenha os usuários encontrados na variável searchedUsers
    this.searchedUsers = []; // Limpa os resultados anteriores
    // Lógica para buscar os usuários com base no termo de pesquisa e armazenar em searchedUsers
  }

}
