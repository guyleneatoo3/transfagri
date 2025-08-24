package com.example.TRANSFAGRI.Repository;

import com.example.TRANSFAGRI.Model.EMF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EMFRepository extends JpaRepository<EMF, Integer> {
    Optional<EMF> findByIdEMF(Integer EMF);
}
