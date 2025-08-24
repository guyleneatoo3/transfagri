package com.example.TRANSFAGRI.Service;

import com.example.TRANSFAGRI.Model.Utilisateur;
import com.example.TRANSFAGRI.Package.AuthResponse;
import com.example.TRANSFAGRI.Repository.UtilisateurRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse login(String email, String rawPassword) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email introuvable"));

        if (!passwordEncoder.matches(rawPassword, utilisateur.getMotpass())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        String token = jwtUtil.generateToken(utilisateur);
        return new AuthResponse(
                token,
                //utilisateur.getNom(),
                utilisateur.getEmail(),
                utilisateur.getRole().toString()
        );
    }
}