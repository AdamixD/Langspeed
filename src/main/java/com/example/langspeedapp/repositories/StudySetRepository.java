package com.example.langspeedapp.repositories;

import com.example.langspeedapp.models.StudySet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudySetRepository extends JpaRepository<StudySet, Long> {
}
