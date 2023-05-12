package com.spring.odr.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.spring.odr.LocationRepository;
import com.spring.odr.entity.Location;;

@Controller
public class MapController {
	
	@Autowired
	LocationRepository locationRepository;

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
	
	 @GetMapping
	 public List<String> getAllLocation() {
		 List<Location> destination = locationRepository.findAll();
		 List<String> locationName = destination.stream().map(Location::getLocation_end).collect(Collectors.toList());
		 return locationName;
	 }

}
