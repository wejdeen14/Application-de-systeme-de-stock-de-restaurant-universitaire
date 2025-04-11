package com.example.restaurant_universitaire.config;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.restaurant_universitaire.Model.user;
import com.example.restaurant_universitaire.Repository.userRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final userRepository userRepository;

    public CustomUserDetailsService(userRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var op = userRepository.findByMail(username);
        user user = op.orElseThrow(() -> new UsernameNotFoundException("No user found for " + username));
        
        // Afficher le mail de l'utilisateur dans la console
        System.out.println("Email de l'utilisateur : " + user.getMail());

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));

        return new org.springframework.security.core.userdetails.User(user.getMail(), user.getMot_de_passe(),
                authorities);
    }
}