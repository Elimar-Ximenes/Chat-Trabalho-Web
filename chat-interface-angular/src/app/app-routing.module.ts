import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { AuthenticatedGuard } from './authenticated.guard';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent},
  { path: 'login', component: LoginComponent },
  //{ path: 'chat', component: ChatComponent,canActivate: [AuthenticatedGuard] },
  { path: 'chat/:nome_usuario', component: ChatComponent, canActivate: [AuthenticatedGuard] },
  { path: 'home', component: HomeComponent,canActivate: [AuthenticatedGuard] },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
