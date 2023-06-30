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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>(this.API_URL).subscribe(users => {
      this.users = users;
    });
  }

  startChat(user: any): void {
    const email = user.email;
    this.router.navigate(['/chat', email]);
  }
}
