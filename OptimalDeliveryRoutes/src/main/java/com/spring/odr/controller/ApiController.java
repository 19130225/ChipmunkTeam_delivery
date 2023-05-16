package com.spring.odr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.odr.entity.Location;
import com.spring.odr.repository.LocationRepository;

@RestController
@CrossOrigin("*")
public class ApiController {
    @Autowired
    LocationRepository locationRepository;
    @GetMapping("/getSearch")
    public List<Location> getAll(){
        return  locationRepository.findAll();
    }
}
