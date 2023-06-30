package br.ufc.projeto08.projeto08.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import br.ufc.projeto08.projeto08.Model.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
    Usuario findByEmail(String email);

    @Query("SELECT u FROM Usuario u WHERE u.email <> :email")
    Iterable<Usuario> findByEmailNotEquals(@Param("email") String email);

    @Query("SELECT u FROM Usuario u WHERE u.email = :email AND u.senha = :senha")
    Usuario findByEmailAndSenha(@Param("email") String email, @Param("senha") String senha);

    @Query("SELECT COUNT(u) > 0 FROM Usuario u WHERE u.email = :email")
    boolean existsByEmail(String email);
}
