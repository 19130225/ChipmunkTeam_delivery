package com.spring.odr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.odr.repository.LocationRepository;

@Service("service")
public class LocationServiceImpl implements LocationService{
	
	@Autowired
	LocationRepository locationRepository;

	@Override
	public List<String> search(String term) {
		return locationRepository.search(term);
	}

}
