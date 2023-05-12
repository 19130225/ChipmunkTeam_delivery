package com.spring.odr;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.odr.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long>{

}
