import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = ''; // Valor inicial vazio
  password: string = ''; // Valor inicial vazio

  constructor(private loginService: LoginService, private router: Router, private localStorage: StorageService) {}
 
  ngOnInit(): void {
  }

  login(){
    console.log('login - ' + this.email + ':' + this.password);
    this.loginService.login(this.email, this.password).subscribe((user) => {
      this.router.navigate(['/home']);
      this.localStorage.set('authorization', btoa(this.email + ':' + this.password));
      console.log(user);
    }, (error) => {
      alert('Usuario ou senha invalidos. Tente novamente');
    });
  }
}
