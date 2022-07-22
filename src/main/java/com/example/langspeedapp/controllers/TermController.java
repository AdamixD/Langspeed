package com.example.langspeedapp.controllers;

import com.example.langspeedapp.exceptions.StudySetNotFoundException;
import com.example.langspeedapp.exceptions.TermNotFoundException;
import com.example.langspeedapp.payload.TermRequest;
import com.example.langspeedapp.services.TermService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/term")
public class TermController {

    private final TermService termService;

    @GetMapping("/get")
    public ResponseEntity<?> getTerm(@RequestParam("termId") Long termId) {
        try{
            return ResponseEntity.ok().body(termService.getTerm(termId));
        } catch (TermNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTerms() {
        try{
            return ResponseEntity.ok().body(termService.getAllTerms());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTerm(@RequestBody TermRequest termRequest) {
        try{
            return ResponseEntity.ok().body(termService.addTerm(termRequest));
        } catch (StudySetNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editTerm(@RequestParam("termId") Long termId, @RequestBody TermRequest termRequest) {
        try{
            return ResponseEntity.ok().body(termService.editTerm(termId, termRequest));
        } catch (TermNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/tick_mastered")
    public ResponseEntity<?> tickIsMastered(@RequestParam("termId") Long termId) {
        try{
            return ResponseEntity.ok().body(termService.tickIsMastered(termId));
        } catch (TermNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/tick_selected")
    public ResponseEntity<?> tickIsSelected(@RequestParam("termId") Long termId) {
        try{
            return ResponseEntity.ok().body(termService.tickIsSelected(termId));
        } catch (TermNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteTerm(@RequestParam("termId") Long termId) {
        try{
            return ResponseEntity.ok().body(termService.deleteTerm(termId));
        } catch (TermNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}


