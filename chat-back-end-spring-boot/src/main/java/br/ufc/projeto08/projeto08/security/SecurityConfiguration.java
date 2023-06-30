package br.ufc.projeto08.projeto08.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import br.ufc.projeto08.projeto08.Model.Usuario;
import br.ufc.projeto08.projeto08.Repository.UsuarioRepository;

@Configuration
public class SecurityConfiguration {

    private final UsuarioRepository usuarioRepository;

    public SecurityConfiguration(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .authorizeRequests()
            //.requestMatchers(HttpMethod.GET, "/api/usuario").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/usuario").permitAll()
                //.requestMatchers(HttpMethod.POST, "/api/chat/mensagem/enviar").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/usuario/verificar-email").permitAll()
                //.anyRequest().authenticated()
            .and()
            .httpBasic()
                .and()
            .authenticationProvider(authProvider());

        return http.build();
    }


    @Bean
    public AuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            Usuario user = usuarioRepository.findByEmail(username);
            if (user == null) {
                throw new UsernameNotFoundException("Usuário não encontrado");
            }
            return user;
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
