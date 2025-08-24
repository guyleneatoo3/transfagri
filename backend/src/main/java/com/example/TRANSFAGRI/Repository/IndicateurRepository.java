package com.example.TRANSFAGRI.Repository;

import com.example.TRANSFAGRI.Model.Indicateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IndicateurRepository extends JpaRepository<Indicateur, Integer> {
    Optional<Indicateur> findByIdIndicateur(Integer idIndicateur);
    Optional<Indicateur> findByLibele(String libele);
    Optional<Indicateur> findByObjectif(String objectif);
    Optional<Indicateur> findByType(String type);
    Optional<Indicateur> findBySeuiAttendu(String seuiAttendu);
    Optional<Indicateur> findByUniteMesure(String uniteMesure);

}
