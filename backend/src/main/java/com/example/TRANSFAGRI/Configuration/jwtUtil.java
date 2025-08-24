package com.example.TRANSFAGRI.Configuration;

import com.example.TRANSFAGRI.Model.Utilisateur;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class jwtUtil {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(Utilisateur utilisateur) {
        return Jwts.builder()
                .setSubject(utilisateur.getNom())
                .claim("role", utilisateur.getRole())
                .claim("email", utilisateur.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 jour
                .signWith(key)
                .compact();
    }
}
