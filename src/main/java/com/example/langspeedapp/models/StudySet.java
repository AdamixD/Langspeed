package com.example.langspeedapp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudySet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private LocalDateTime creatingTime;
    private LocalDateTime lastUseTime;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private AppUser owner;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @OneToMany(
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        mappedBy = "studySet"
    )
    private List<Term> terms;

    public StudySet(String title,
                    LocalDateTime creatingTime,
                    LocalDateTime lastUseTime,
                    AppUser owner,
                    Folder folder) {
        this.title = title;
        this.creatingTime = creatingTime;
        this.lastUseTime = lastUseTime;
        this.owner = owner;
        this.folder = folder;
    }
}