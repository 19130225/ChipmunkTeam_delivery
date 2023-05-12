package com.spring.odr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="location")
public class Location {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="location_start")
	private String location_start;
	
	@Column(name="location_end")
	private String location_end;

	public Location(Long id, String location_start, String location_end) {
		super();
		this.id = id;
		this.location_start = location_start;
		this.location_end = location_end;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLocation_start() {
		return location_start;
	}

	public void setLocation_start(String location_start) {
		this.location_start = location_start;
	}

	public String getLocation_end() {
		return location_end;
	}

	public void setLocation_end(String location_end) {
		this.location_end = location_end;
	}
	
	

}
