package com.spring.odr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.odr.service.LocationService;

import jakarta.servlet.http.HttpServletRequest;


@Controller
public class MapController {
	
	@Autowired
	LocationService service;
	
	@GetMapping("/")
	public String showMap() {
		return "index";
	}

	@RequestMapping(value = "search", method = RequestMethod.GET)
	@ResponseBody
	public List<String> search(HttpServletRequest request) {
		return service.search(request.getParameter("term"));
	}


}
