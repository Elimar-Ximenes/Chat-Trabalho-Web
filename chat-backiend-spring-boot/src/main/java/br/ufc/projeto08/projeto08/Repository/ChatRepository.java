package br.ufc.projeto08.projeto08.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import br.ufc.projeto08.projeto08.Model.Chat;

public interface ChatRepository extends CrudRepository<Chat, String> {
    @Transactional(readOnly = true)
    @Query("SELECT c FROM Chat c WHERE (c.emissor.email = :emissorEmail AND c.destinatario.email = :destinatarioEmail) OR (c.emissor.email = :destinatarioEmail AND c.destinatario.email = :emissorEmail)")
    Iterable<Chat> getConversa(@Param("emissorEmail") String emissorEmail, @Param("destinatarioEmail") String destinatarioEmail);
}
