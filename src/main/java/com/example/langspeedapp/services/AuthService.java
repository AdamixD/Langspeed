package com.example.langspeedapp.services;

import com.example.langspeedapp.exceptions.EmailTakenException;
import com.example.langspeedapp.exceptions.UserNotFoundException;
import com.example.langspeedapp.models.AppUser;
import com.example.langspeedapp.payload.AppUserRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class AuthService {

    private final AppUserDetailsService appUserDetailsService;

    public void register(AppUserRequest request) throws EmailTakenException {
        appUserDetailsService.signUpUser(
                new AppUser(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword()
                )
        );
    }

    public void resetApplicationUserPassword(String password, Long id) throws UserNotFoundException {
        appUserDetailsService.resetPassword(password, id);
    }
}
