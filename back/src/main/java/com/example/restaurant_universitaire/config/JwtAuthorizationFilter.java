package com.example.restaurant_universitaire.config;

import java.io.IOException;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(10)
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Value("${app.auth.token.key}")
    private String tokenKey;

    private final UserDetailsService userDetailsService;

    public JwtAuthorizationFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String bearer = request.getHeader("Authorization");
        String token = null;
        if (bearer != null && bearer.startsWith("Bearer ")) {
            token = bearer.substring(7);
            try {
                var jwt = JWT.decode(token);
                var expiresAt = jwt.getExpiresAt();
                var skew = Duration.ofSeconds(60);
                // if (expiresAt.toInstant().isBefore(Instant.now().minus(skew))) {
                // throw new JWTVerificationException("Token has expired on: " + expiresAt);
                // }
                var user = JWT.require(Algorithm.HMAC256(tokenKey))
                        .withIssuer("fx-" + request.getRemoteHost())
                        .build()
                        .verify(token);

                try {
                    var loadedUser = userDetailsService.loadUserByUsername(user.getSubject());
                    var authentication = new UsernamePasswordAuthenticationToken(loadedUser, null,
                            loadedUser.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    var sc = SecurityContextHolder.getContext();
                    sc.setAuthentication(authentication);
                    // HttpSession session = request.getSession(true);
                    // session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
                } catch (UsernameNotFoundException usernameNotFoundException) {
                    System.out.println(usernameNotFoundException.getMessage());
                }
            } catch (JWTVerificationException e) {
                System.out.println("---------------------------");
                System.out.println(e.getMessage());
                System.out.println("---------------------------");
            }
        }
        filterChain.doFilter(request, response);
    }
}