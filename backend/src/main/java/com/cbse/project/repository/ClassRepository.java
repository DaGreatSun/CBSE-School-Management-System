package com.cbse.project.repository;

import com.cbse.project.model.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends JpaRepository<Class, Integer> {

    public Class findByName(String name);
}
