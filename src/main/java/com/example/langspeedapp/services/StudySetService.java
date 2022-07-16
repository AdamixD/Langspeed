package com.example.langspeedapp.services;

import com.example.langspeedapp.exceptions.FolderNotFoundException;
import com.example.langspeedapp.exceptions.StudySetNotFoundException;
import com.example.langspeedapp.exceptions.UserNotFoundException;
import com.example.langspeedapp.models.StudySet;
import com.example.langspeedapp.models.Term;
import com.example.langspeedapp.payload.StudySetRequest;
import com.example.langspeedapp.repositories.StudySetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudySetService {

    private final StudySetRepository studySetRepository;
    private final AppUserDetailsService appUserDetailsService;
    private final FolderService folderService;

    public Optional<StudySet> loadStudySetById(Long studySetId) {
        return studySetRepository.findById(studySetId);
    }

    public StudySet getStudySet(Long studySetId) throws StudySetNotFoundException {
        if (loadStudySetById(studySetId).isPresent()) {
            return loadStudySetById(studySetId).get();
        } else {
            throw new StudySetNotFoundException("Could not find studySet with ID " + studySetId);
        }
    }

    public List<StudySet> getAllStudySets() {
        return studySetRepository.findAll().stream()
                .sorted(Comparator.comparing(StudySet::getTitle))
                .collect(Collectors.toList());
    }

    public List<Term> getStudySetTerms(Long studySetId) throws StudySetNotFoundException {
        return getStudySet(studySetId).getTerms().stream()
                .sorted(Comparator.comparing(Term::getCreatingTime).reversed())
                .collect(Collectors.toList());
    }

    public List<Term> getStudySetMasteredTerms(Long studySetId) throws StudySetNotFoundException {
        return getStudySetTerms(studySetId).stream()
                .filter(Term::getIsMastered)
                .collect(Collectors.toList());
    }

    public List<Term> getStudySetSelectedTerms(Long studySetId) throws StudySetNotFoundException {
        return getStudySetTerms(studySetId).stream()
                .filter(Term::getIsSelected)
                .collect(Collectors.toList());
    }

    public StudySet addStudySet(StudySetRequest studySetRequest) throws UserNotFoundException, FolderNotFoundException {
        StudySet studySet = new StudySet(
                studySetRequest.getTitle(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                appUserDetailsService.getAppUser(studySetRequest.getOwnerId()),
                folderService.getFolder(studySetRequest.getFolderId())
        );
        return studySetRepository.save(studySet);
    }

    public Long deleteStudySet(Long studySetId) throws StudySetNotFoundException {
        StudySet studySet = getStudySet(studySetId);
        studySetRepository.delete(studySet);
        return studySet.getId();
    }

    public StudySet editStudySet(Long studySetId, StudySetRequest studySetRequest) throws StudySetNotFoundException, FolderNotFoundException {
        StudySet studySet = getStudySet(studySetId);
        studySet.setTitle(studySetRequest.getTitle());
        studySet.setFolder(folderService.getFolder(studySetRequest.getFolderId()));
        return studySetRepository.save(studySet);
    }
}
