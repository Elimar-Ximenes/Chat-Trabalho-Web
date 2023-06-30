import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.storage.get('authorization')) {
      console.log('AuthenticatedGuard - Usuário autenticado');
      return true; // Usuário autenticado, permite o acesso à rota
    } else {
      console.log('AuthenticatedGuard - Usuário não autenticado');
      this.router.navigate(['/login']); // Redireciona para a página de login se não estiver autenticado
      return false; // Bloqueia o acesso à rota
    }
  }
}
