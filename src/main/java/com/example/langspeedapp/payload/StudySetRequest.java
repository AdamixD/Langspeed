package com.example.langspeedapp.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StudySetRequest {

    private String title;
    private Long ownerId;
    private Long folderId;     // TODO if folderId == 0 => studySet is not assigned to any folder
}

