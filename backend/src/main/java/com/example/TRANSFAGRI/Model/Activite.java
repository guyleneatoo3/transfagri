package com.example.TRANSFAGRI.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Activite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;

    private String emfAssigne;
    private String statut; // "Terminé", "En cours", "En retard"

    private String dateEcheance; // format: dd/MM/yyyy
}
