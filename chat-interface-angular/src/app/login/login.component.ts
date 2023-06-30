import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = ''; // Valor inicial vazio
  password: string = ''; // Valor inicial vazio

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private localStorage: StorageService, 
    private http: HttpClient) {}
 
  ngOnInit(): void {
  }

  login(){
    console.log('login - ' + this.email + ':' + this.password);
    this.loginService.login(this.email, this.password).subscribe((user) => {
      this.router.navigate(['/home']);
      this.localStorage.set('authorization', btoa(this.email + ':' + this.password));
      
      const apiUrl = 'http://localhost:8080/api/usuario/verificar';
      this.http.get<any>(`${apiUrl}?email=${this.email}`).subscribe((response) => {
      const usuario = response; // Armazena o valor da resposta na variável 'usuario'
      
      localStorage.setItem('userEmail', this.email);
      localStorage.setItem('userNome', usuario.nome);
      localStorage.setItem('userFoto', usuario.foto);
   
      }, (error) => {
        console.log(error);
        alert('Usuario ou senha invalidos. Tente novamente');
      });
     
      console.log(user);
    }, (error) => {
      console.log(error);
      alert('Usuario ou senha invalidos. Tente novamente');
    });
  }
}
