import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  /*ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const usernameParam = params.get('nome_usuario');
      this.username = usernameParam ? usernameParam : 'Nome de usuário não fornecido';
      console.log('Nome do usuário:', this.username);
    });
  }*/

  userEmail = localStorage.getItem('userEmail');
  userFoto = localStorage.getItem('userFoto');
  userNome = localStorage.getItem('userNome');


  /***********************/private CHAT_URL = 'http://localhost:8080/api/chat/mensagem';

  messages: any[] = [];
  newMessage: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const usernameParam = params.get('nome_usuario');
      this.username = usernameParam ? usernameParam : 'Nome de usuário não fornecido';
      //console.log('Nome do usuário:', this.username);
    });

    this.loadMessages();
  }

  loadMessages(): void {
    // Fazer a requisição HTTP para carregar as mensagens do chat
    const emissorEmail = localStorage.getItem('userEmail');
    const destinatarioEmail = this.username;
    const chatUrl = `${this.CHAT_URL}/${emissorEmail}/${destinatarioEmail}`;

    this.http.get<any[]>(chatUrl).subscribe(
      messages => {
        this.messages = messages;
      },
      error => {
        console.error('Erro ao carregar as mensagens:', error);
        // Tratar o erro de carregamento das mensagens
      }
    );
  }

  sendMessage(): void {
    const emissorEmail = localStorage.getItem('userEmail');
    const destinatarioEmail = this.username;
    const mensagem = this.newMessage;
    const horario = new Date().toISOString();

    const messageData = {
      emissor: {
        email: emissorEmail
      },
      destinatario: {
        email: destinatarioEmail
      },
      mensagem: mensagem,
      horario: horario
    };

    this.http.post(this.CHAT_URL + '/enviar', messageData).subscribe(
      response => {
        console.log('Mensagem enviada com sucesso');
        // Realizar qualquer ação necessária após o envio da mensagem

        // Limpar o campo de texto da mensagem
        this.newMessage = '';

        // Carregar novamente as mensagens para exibir a mensagem enviada
        this.loadMessages();
      },
      error => {
        console.error('Erro ao enviar a mensagem:', error);
        // Tratar o erro de envio da mensagem
      }
    );
  }
}