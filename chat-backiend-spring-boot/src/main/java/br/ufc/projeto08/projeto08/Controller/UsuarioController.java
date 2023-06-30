package br.ufc.projeto08.projeto08.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


import br.ufc.projeto08.projeto08.Model.Usuario;
import br.ufc.projeto08.projeto08.Repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuario")
//@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {
    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/except")
    Iterable<Usuario> getUsuariosExcept(@RequestParam("email") String email) {
        return usuarioRepository.findByEmailNotEquals(email);
    }

    @GetMapping
    Iterable<Usuario> getUsuarios() {
        return usuarioRepository.findAll();
    }

   @GetMapping("/me")
    boolean getUser() {
        return true;
    }

    @GetMapping("/verificar")
    Usuario verificarUsuario(@RequestParam("email") String email, @RequestParam("senha") String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }

    @GetMapping("/verificar-email")
    boolean verificarEmailExistente(@RequestParam("email") String email) {
        return usuarioRepository.existsByEmail(email);
    }

    @PostMapping
    public Usuario saveUsuario(@RequestBody Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }
}
