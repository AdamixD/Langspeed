package com.example.langspeedapp.controllers;

import com.example.langspeedapp.exceptions.FolderNotFoundException;
import com.example.langspeedapp.exceptions.UserNotFoundException;
import com.example.langspeedapp.payload.FolderRequest;
import com.example.langspeedapp.services.FolderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/folder")
public class FolderController {

    private final FolderService folderService;

    @GetMapping("/get")
    public ResponseEntity<?> getFolder(@RequestParam("folderId") Long folderId) {
        try{
            return ResponseEntity.ok().body(folderService.getFolder(folderId));
        } catch (FolderNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllFolders() {
        try{
            return ResponseEntity.ok().body(folderService.getAllFolders());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get_study_sets")
    public ResponseEntity<?> getFolderStudySets(@RequestParam("folderId") Long folderId) {
        try{
            return ResponseEntity.ok().body(folderService.getFolderStudySets(folderId));
        } catch (FolderNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addFolder(@RequestBody FolderRequest folderRequest) {
        try{
            return ResponseEntity.ok().body(folderService.addFolder(folderRequest));
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editFolder(@RequestParam("folderId") Long folderId, @RequestBody FolderRequest folderRequest) {
        try{
            return ResponseEntity.ok().body(folderService.editFolder(folderId, folderRequest));
        } catch (FolderNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFolder(@RequestParam("folderId") Long folderId) {
        try{
            return ResponseEntity.ok().body(folderService.deleteFolder(folderId));
        } catch (FolderNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
