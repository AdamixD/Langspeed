package com.example.langspeedapp.models;

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
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private LocalDateTime creatingTime;
    private LocalDateTime lastUseTime;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private AppUser owner;

    @OneToMany(
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        mappedBy = "folder"
    )
    private List<StudySet> studySets;

    public Folder(String title,
                  LocalDateTime creatingTime,
                  LocalDateTime lastUseTime,
                  AppUser owner) {
        this.title = title;
        this.creatingTime = creatingTime;
        this.lastUseTime = lastUseTime;
        this.owner = owner;
    }
}