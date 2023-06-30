import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const usernameParam = params.get('nome_usuario');
      this.username = usernameParam ? usernameParam : 'Nome de usuário não fornecido';
      console.log('Nome do usuário:', this.username);
    });
  }
}
