package com.spring.odr.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .authorizeHttpRequests()
	            .requestMatchers("/").permitAll()
	            .anyRequest().authenticated()
	            .and()
	        .formLogin()
	            .loginPage("/login")
	            .successHandler(successHandler())
	            .permitAll()
	        .and()
	        .oauth2Login()
	        	.loginPage("/login")
	            .successHandler(successHandler());
	    return http.build();
	}

	private AuthenticationSuccessHandler successHandler() {
	    return (request, response, authentication) -> {
	        response.sendRedirect("/index");
	    };
	}





}
