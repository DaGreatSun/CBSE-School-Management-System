package com.cbse.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

// RestControllerAdvice annotation is a combination of ControllerAdvice and Responsebody.
// Used in Java to create global exception handlers for RESTful APIs.
@RestControllerAdvice
public class CustomExceptionHandler {
    // This method get triggered whenever there is MethodArgumentNotValidException exception.
    // It shows only the user friendly error message.
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String,String> handleInvalidArgument(MethodArgumentNotValidException exception) {
        System.out.println("enter???");
        Map<String,String>errorMap=new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error-> {
            errorMap.put(error.getField(),error.getDefaultMessage());
        });
        return errorMap;
    }
}
