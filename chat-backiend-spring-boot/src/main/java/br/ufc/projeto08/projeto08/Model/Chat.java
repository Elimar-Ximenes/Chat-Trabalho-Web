package br.ufc.projeto08.projeto08.Model;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Chat {
    @Id
    @GeneratedValue
    private int codigo;
    private String mensagem;
    @ManyToOne
    private Usuario emissor;
    @ManyToOne
    private Usuario destinatario;
    private Date horario;
    public int getCodigo() {
        return codigo;
    }
    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }
    public String getMensagem() {
        return mensagem;
    }
    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
    public Usuario getEmissor() {
        return emissor;
    }
    public void setEmissor(Usuario emissor) {
        this.emissor = emissor;
    }
    public Usuario getDestinatario() {
        return destinatario;
    }
    public void setDestinatario(Usuario destinatario) {
        this.destinatario = destinatario;
    }
    public Date getHorario() {
        return horario;
    }
    public void setHorario(Date horario) {
        this.horario = horario;
    }

    
}
