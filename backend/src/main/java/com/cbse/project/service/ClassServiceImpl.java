package com.cbse.project.service;

import com.cbse.project.model.Class;
import com.cbse.project.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassServiceImpl implements ClassService {

    @Autowired
    ClassRepository classRepository;


    @Override
    public List<Class> viewAllClasses() throws Exception {
        List<Class> classList = classRepository.findAll();

        if (classList.isEmpty()) {
            throw new Exception("No class has been found. Try again later");
        }

        return classList;
    }
}
