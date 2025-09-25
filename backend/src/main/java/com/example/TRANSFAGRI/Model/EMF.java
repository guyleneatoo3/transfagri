package com.example.TRANSFAGRI.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "emf")
@Data
public class EMF {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String denomination;
    private String localisation;

    @JsonProperty("Dirigeant")
    private String dirigeant;

    @JsonProperty("Numero_d_agreement")
    private String numeroDAgrement;

    @JsonProperty("NumeroCNC")
    private String numeroCNC;

    private String email;

    @OneToMany
    @JoinColumn(name = "emf_id")
    private List<Utilisateur> utilisateurs;

    public EMF() {}

    public EMF(String denomination, String localisation, String dirigeant, String numeroDAgrement, String numeroCNC, String email) {
        this.denomination = denomination;
        this.localisation = localisation;
        this.dirigeant = dirigeant;
        this.numeroDAgrement = numeroDAgrement;
        this.numeroCNC = numeroCNC;
        this.email = email;
    }
}
