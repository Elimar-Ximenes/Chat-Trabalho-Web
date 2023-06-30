package br.ufc.projeto08.projeto08.Controller;
//import java.util.List;
//import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import br.ufc.projeto08.projeto08.Model.Usuario;
import br.ufc.projeto08.projeto08.Model.Chat;
import br.ufc.projeto08.projeto08.Repository.ChatRepository;

@RestController
@RequestMapping("/api/chat/mensagem")
public class ChatController {
    @Autowired
    ChatRepository chatRepository;
   
    @PostMapping("/enviar")
    Chat postChat(@RequestBody Chat mensagem) {
        return chatRepository.save(mensagem);
    }

    @GetMapping
    Iterable<Chat> getChat() {
        return chatRepository.findAll();
    }

  @GetMapping("/{emissorEmail}/{destinatarioEmail}")
    Iterable<Chat> getConversa(@PathVariable("emissorEmail") String emissorEmail, @PathVariable("destinatarioEmail") String destinatarioEmail) {
        return chatRepository.getConversa(emissorEmail, destinatarioEmail);
    }

}
