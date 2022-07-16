package com.example.langspeedapp.controllers;

import com.example.langspeedapp.exceptions.StudySetNotFoundException;
import com.example.langspeedapp.payload.StudySetRequest;
import com.example.langspeedapp.services.StudySetService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/study_set")
public class StudySetController {

    private final StudySetService studySetService;

    @GetMapping("/get")
    public ResponseEntity<?> getStudySet(@RequestParam("setId") Long setId) {
        try{
            return ResponseEntity.ok().body(studySetService.getStudySet(setId));
        } catch (StudySetNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllStudySets() {
        try{
            return ResponseEntity.ok().body(studySetService.getAllStudySets());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get_terms")
    public ResponseEntity<?> getStudySetTerms(@RequestParam("setId") Long setId) {
        try{
            return ResponseEntity.ok().body(studySetService.getStudySetTerms(setId));
        } catch (StudySetNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get_mastered_terms")
    public ResponseEntity<?> getStudySetMasteredTerms(@RequestParam("setId") Long setId) {
        try{
            return ResponseEntity.ok().body(studySetService.getStudySetMasteredTerms(setId));
        } catch (StudySetNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get_selected_terms")
    public ResponseEntity<?> getStudySetSelectedTerms(@RequestParam("setId") Long setId) {
        try{
            return ResponseEntity.ok().body(studySetService.getStudySetSelectedTerms(setId));
        } catch (StudySetNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addStudySet(@RequestBody StudySetRequest studySetRequest) {
        try{
            return ResponseEntity.ok().body(studySetService.addStudySet(studySetRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editStudySet(@RequestParam("setId") Long setId, @RequestBody StudySetRequest studySetRequest) {
        try{
            return ResponseEntity.ok().body(studySetService.editStudySet(setId, studySetRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteStudySet(@RequestParam("setId") Long setId) {
        try{
            return ResponseEntity.ok().body(studySetService.deleteStudySet(setId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
