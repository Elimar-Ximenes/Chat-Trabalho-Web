import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_USER_ME: string = 'http://localhost:8080/api/usuario/me  ';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string) {
    const headers = new HttpHeaders(
      {
        authorization : 'Basic ' + btoa(email + ':' + senha)
      }
    );
    return this.http.get<Object>(this.API_USER_ME, {headers: headers});
  }
}

