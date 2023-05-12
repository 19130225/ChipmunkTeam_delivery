package com.spring.odr.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;;

@Controller
public class MapController {

	@GetMapping("/")
	public String redirectToLogin(Authentication authentication) {
	    if (authentication == null || !authentication.isAuthenticated()) {
	        return "redirect:/login";
	    }
	    return "redirect:/index";
	}

	@GetMapping("/login")
	public String login() {
	    return "login";
	}

	@GetMapping("/index")
	public String showMap() {
	    return "index";
	}
	
	






}
