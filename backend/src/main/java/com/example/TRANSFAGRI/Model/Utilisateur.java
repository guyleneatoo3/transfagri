package com.example.TRANSFAGRI.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity//pour génerer des tables
@Data//
@AllArgsConstructor//
@NoArgsConstructor
@Builder//

public class Utilisateur {

        @Id
        @GeneratedValue(strategy= GenerationType.IDENTITY)//l'identifiant est auto increment
        private Integer id_utilisateur;
        private String nom;
        private String email;
        private String motpass;
        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private Role role;

        public enum Role{
            utilisateur,
            superAdmin,
            CNEF,
            PASFNI,
            EMF,
        }
    }

