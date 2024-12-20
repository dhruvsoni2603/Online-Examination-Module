package com.oem.backend.service;

import com.oem.backend.model.Student;
import com.oem.backend.model.StudentPrinciple;
import com.oem.backend.repository.StudentRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class StudentDetailsService implements UserDetailsService {

    private final StudentRepo studentRepository;

    public StudentDetailsService(StudentRepo studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Student student = studentRepository.findByEmail(username);

        if (student == null) {
            System.out.println("Student not found");
            throw new UsernameNotFoundException("Student not found");
        }

        return new StudentPrinciple(student);
    }

}
