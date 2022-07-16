package com.example.langspeedapp.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FolderRequest {

    private String title;
    private Long ownerId;
}
