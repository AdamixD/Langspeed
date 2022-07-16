package com.example.langspeedapp.controllers;

import com.example.langspeedapp.exceptions.UserNotFoundException;
import com.example.langspeedapp.payload.AppUserEditRequest;
import com.example.langspeedapp.services.AppUserDetailsService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/user")
public class AppUserController {

    private final AppUserDetailsService appUserDetailsService;

    @GetMapping("/get")
    public ResponseEntity<?> getUser(@RequestParam("userId") Long userId) {
        try{
            return ResponseEntity.ok().body(appUserDetailsService.getAppUser(userId));
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get_by_email")
    public ResponseEntity<?> getUserByEmail(@RequestParam("email") String email) {
        try{
            return ResponseEntity.ok().body(appUserDetailsService.getUserByEmail(email));
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok().body(appUserDetailsService.getAllUsers());
    }

    @GetMapping("/folders")
    public ResponseEntity<?> getFoldersByUserId(@RequestParam("userId") Long userId) {
        try{
            return ResponseEntity.ok().body(appUserDetailsService.getFoldersByUserId(userId));
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/study_sets")
    public ResponseEntity<?> getStudySetsByUserId(@RequestParam("userId") Long userId) {
        try{
            return ResponseEntity.ok().body(appUserDetailsService.getStudySetsByUserId(userId));
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editUser(@RequestParam("userId") Long userId, @RequestBody AppUserEditRequest request) {
        try{
            return ResponseEntity.ok(appUserDetailsService.editUser(userId, request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAppUser(@RequestParam("userId") Long userId){
        try{
            return ResponseEntity.ok(appUserDetailsService.deleteUser(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
