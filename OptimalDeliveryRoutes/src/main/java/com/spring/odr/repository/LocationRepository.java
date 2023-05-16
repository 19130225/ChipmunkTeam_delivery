package com.spring.odr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.odr.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long>{
	
	@Query("SELECT name FROM Location l WHERE l.name LIKE %:term%")
	List<String> search(@Param("term") String term);

}
