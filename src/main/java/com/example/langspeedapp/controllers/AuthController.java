package com.example.langspeedapp.controllers;

import com.example.langspeedapp.models.AppUserDetails;
import com.example.langspeedapp.payload.AppUserRequest;
import com.example.langspeedapp.payload.AuthResponse;
import com.example.langspeedapp.payload.LoginRequest;
import com.example.langspeedapp.security.jwt.JwtUnit;
import com.example.langspeedapp.services.AuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final JwtUnit jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        AppUserDetails userDetails = (AppUserDetails) authentication.getPrincipal();
        if (userDetails.isEnabled()) {
            String role = userDetails.getAuthorities().toString();

            log.info("User logged");

            return ResponseEntity.ok(
                    new AuthResponse(
                            jwt,
                            userDetails.getId(),
                            userDetails.getEmail(),
                            role
                    )
            );
        } else {
            return ResponseEntity.badRequest().body("Account is not confirmed");
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registerUser(@RequestBody AppUserRequest appUserRequest) {
        try {
            authService.register(appUserRequest);
            return ResponseEntity.ok("User is registered");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset_password")
    public ResponseEntity<?> resetPassword(@RequestParam("password") String password, @RequestParam("email") String email) {
        try {
            authService.resetApplicationUserPassword(password, email);
            return ResponseEntity.ok("Password has been changed");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
