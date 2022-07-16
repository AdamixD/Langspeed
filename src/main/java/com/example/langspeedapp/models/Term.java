package com.example.langspeedapp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String term;
    private String definition;
    private LocalDateTime creatingTime;
    private Boolean isMastered = false;
    private Boolean isSelected = false;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "study_set_id")
    private StudySet studySet;

    public Term(String term,
                String definition,
                LocalDateTime creatingTime,
                StudySet studySet) {
        this.term = term;
        this.definition = definition;
        this.creatingTime = creatingTime;
        this.studySet = studySet;
    }
}
