package com.example.langspeedapp.services;

import com.example.langspeedapp.exceptions.StudySetNotFoundException;
import com.example.langspeedapp.exceptions.TermNotFoundException;
import com.example.langspeedapp.models.Term;
import com.example.langspeedapp.payload.TermRequest;
import com.example.langspeedapp.repositories.StudySetRepository;
import com.example.langspeedapp.repositories.TermRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TermService {

    private final TermRepository termRepository;
    private final StudySetService studySetService;

    public Optional<Term> loadTermById(Long termId) {
        return termRepository.findById(termId);
    }

    public Term getTerm(Long termId) throws TermNotFoundException {
        if (loadTermById(termId).isPresent()) {
            return loadTermById(termId).get();
        } else {
            throw new TermNotFoundException("Could not find term with ID " + termId);
        }
    }

    public List<Term> getAllTerms() {
        return termRepository.findAll().stream()
                .sorted(Comparator.comparing(Term::getCreatingTime).reversed())
                .collect(Collectors.toList());
    }

    public Term addTerm(TermRequest termRequest) throws StudySetNotFoundException {
        Term term = new Term(
                termRequest.getTerm(),
                termRequest.getDefinition(),
                LocalDateTime.now(),
                studySetService.getStudySet(termRequest.getStudySetId())
        );
        return termRepository.save(term);
    }

    public Long deleteTerm(Long termId) throws TermNotFoundException {
        Term term = getTerm(termId);
        termRepository.delete(term);
        return term.getId();
    }

    public Term editTerm(Long termId, TermRequest termRequest) throws TermNotFoundException {
        Term term = getTerm(termId);
        term.setTerm(termRequest.getTerm());
        term.setDefinition(termRequest.getDefinition());
        term.setIsMastered(false);
        return termRepository.save(term);
    }

    public Term tickIsMastered(Long termId) throws TermNotFoundException {
        Term term = getTerm(termId);
        term.setIsMastered(!term.getIsMastered());
        return termRepository.save(term);
    }

    public Term tickIsSelected(Long termId) throws TermNotFoundException {
        Term term = getTerm(termId);
        term.setIsSelected(!term.getIsSelected());
        return termRepository.save(term);
    }
}
