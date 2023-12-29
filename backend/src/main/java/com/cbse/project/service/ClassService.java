package com.cbse.project.service;


import com.cbse.project.model.Class;
import com.cbse.project.model.Student;

import java.util.List;

public interface ClassService {

    List<Class> viewAllClasses() throws Exception;

    List<Class> getAllClasses();

    Class getClassById(Integer id);

    Class createClass(Class newClass);

    Class updateClass(Integer id, Class classDetails);

    void deleteClass(Integer id);

    List<Student> getStudentsInClass(Integer classId);

    Class addStudentsToClass(Integer classId, List<Integer> studentIds);

    Class removeStudentsFromClass(Integer classId, List<Integer> studentIds);

}
