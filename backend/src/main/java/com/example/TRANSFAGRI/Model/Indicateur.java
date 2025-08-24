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
public class Indicateur {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)//l'identifiant est auto increment
    private Integer idIndicateur;
    private String libele;
    private String objectif;
    private String type;
    private String seuiAttendu;
    private String uniteMesure;
}
