package com.app.backend.authenticate.TokenUtill;

import io.jsonwebtoken.*;

import java.util.Date;

public class JwtTokenUtill {
    public static final String SECRET_KEY = "BDFAFEB861CE7B77AE9FD3434EDCC"; // WARNING! THIS SHOULDN'T BE ON GITHUB! I USE IT BECAUSE ITS JUST A PROJECT FOR COLLAGE!

    public static String generateToken(String email, String sessionId) {
        long expirationTime = 3600000; // 1h
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setSubject(sessionId) // Basic claim (subject)
                .claim("email", email) // Additional claims
                .setIssuedAt(now) // Set when token was given
                .setExpiration(expireDate) // Set expiration date
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Sign token with hs256 algorithm
                .compact();
    }

    public static Claims verifyToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token);
            return claimsJws.getBody();
        } catch (SignatureException ex) {
            throw new RuntimeException("Invalid JWT signature", ex);
        } catch (Exception ex) {
            throw new RuntimeException("Invalid JWT token", ex);
        }
    }
}
