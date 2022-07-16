package com.example.langspeedapp.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TermRequest {

    private String term;
    private String definition;
    private Long studySetId;
}
