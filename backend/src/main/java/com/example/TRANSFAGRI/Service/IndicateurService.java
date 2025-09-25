package com.example.TRANSFAGRI.Service;

import com.example.TRANSFAGRI.Model.Indicateur;
import com.example.TRANSFAGRI.Repository.IndicateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IndicateurService {

    @Autowired
    private IndicateurRepository indicateurRepository;

    public Indicateur saveIndicateur(Indicateur indicateur) {
        return indicateurRepository.save(indicateur);
    }

    public List<Indicateur> getAllIndicateurs() {
        return indicateurRepository.findAll();
    }

    public Optional<Indicateur> getIndicateurById(Long id) {
        return indicateurRepository.findById(id);
    }

    public void deleteIndicateur(Long id) {
        indicateurRepository.deleteById(id);
    }

    public Indicateur updateIndicateur(Long id, Indicateur updatedIndicateur) {
        return indicateurRepository.findById(id)
                .map(indicateur -> {
                    indicateur.setNom(updatedIndicateur.getNom());
                    indicateur.setDescription(updatedIndicateur.getDescription());
                    return indicateurRepository.save(indicateur);
                })
                .orElseGet(() -> {
                    updatedIndicateur.setId(id);
                    return indicateurRepository.save(updatedIndicateur);
                });
    }
    public List<Indicateur> searchIndicateurs(String searchTerm) {
        if (searchTerm == null || searchTerm.isBlank()) {
            return indicateurRepository.findAll();
        }
    return indicateurRepository.findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(searchTerm, searchTerm);
    }
}
