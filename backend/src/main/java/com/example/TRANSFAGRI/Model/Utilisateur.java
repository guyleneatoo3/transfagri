package com.example.TRANSFAGRI.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // génère automatiquement getters, setters, toString, equals, hashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_utilisateur;

    private String nom;
    private String email;
    private String motpass;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public enum Role {
        utilisateur,
        superAdmin,
        CNEF,
        PASFNI,
        EMF
    }
}
