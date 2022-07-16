package com.example.langspeedapp.services;

import com.example.langspeedapp.exceptions.EmailTakenException;
import com.example.langspeedapp.exceptions.UserNotFoundException;
import com.example.langspeedapp.models.*;
import com.example.langspeedapp.payload.AppUserEditRequest;
import com.example.langspeedapp.repositories.AppUserRepository;
import com.example.langspeedapp.security.PasswordEncoder;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder encoder;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));

        return AppUserDetails.build(user);
    }

    public Optional<AppUser> loadUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    public Optional<AppUser> loadUserById(Long id) {
        return appUserRepository.findById(id);
    }

    public AppUser getAppUser(Long id) throws UserNotFoundException {
        if (loadUserById(id).isPresent()) {
            return loadUserById(id).get();
        } else {
            throw new UserNotFoundException("Could not find user with ID " + id);
        }
    }

    public AppUser getUserByEmail(String email) throws UserNotFoundException {
        if (loadUserByEmail(email).isPresent()) {
            return loadUserByEmail(email).get();
        } else {
            throw new UserNotFoundException("Could not find user with email " + email);
        }
    }

    public List<AppUser> getAllUsers(){
        return appUserRepository.findAll().stream()
                .sorted(Comparator.comparing(AppUser::getLastName, String.CASE_INSENSITIVE_ORDER))
                .collect(Collectors.toList());
    }

//    public List<AppUser> getUsersByIds(List<Long> usersIds) throws UserNotFoundException {
//        List<AppUser> users = new ArrayList<>();
//
//        for (Long id: usersIds) {
//                users.add(getApplicationUser(id));
//            }
//
//        return users.stream()
//                .sorted(Comparator.comparing(AppUser::getLastName))
//                .collect(Collectors.toList());
//    }

    public List<Folder> getFoldersByUserId(Long id) throws UserNotFoundException {
        return getAppUser(id).getFolders().stream()
                .sorted(Comparator.comparing(Folder::getTitle))
                .collect(Collectors.toList());
    }

    public List<StudySet> getStudySetsByUserId(Long id) throws UserNotFoundException {
        return getAppUser(id).getStudySets().stream()
                .sorted(Comparator.comparing(StudySet::getTitle))
                .collect(Collectors.toList());
    }

    public AppUser editUser(Long id, AppUserEditRequest userEditRequest) throws UserNotFoundException {
        AppUser applicationUser = getAppUser(id);
        applicationUser.setFirstName(userEditRequest.getFirstName());
        applicationUser.setLastName(userEditRequest.getLastName());

        return appUserRepository.save(applicationUser);
    }

    public Long deleteUser(Long id) throws UserNotFoundException {
        if (loadUserById(id).isPresent()) {
            appUserRepository.deleteById(id);
        } else {
            throw new UserNotFoundException("Could not find user with ID " + id);
        }
        return id;
    }

    public void signUpUser(AppUser appUser) throws EmailTakenException {
        if (loadUserByEmail(appUser.getEmail()).isPresent()) {
                throw new EmailTakenException("Email is already taken");
        }

        String encodedPassword = encoder.bCryptPasswordEncoder().encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);
        appUserRepository.save(appUser);
    }

    public void resetPassword(String password, Long id) throws UserNotFoundException {
        AppUser applicationUser = getAppUser(id);
        applicationUser.setPassword(encoder.bCryptPasswordEncoder().encode(password));
        appUserRepository.save(applicationUser);
    }
}




