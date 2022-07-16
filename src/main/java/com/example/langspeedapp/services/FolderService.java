package com.example.langspeedapp.services;

import com.example.langspeedapp.exceptions.FolderNotFoundException;
import com.example.langspeedapp.exceptions.UserNotFoundException;
import com.example.langspeedapp.models.Folder;
import com.example.langspeedapp.models.StudySet;
import com.example.langspeedapp.payload.FolderRequest;
import com.example.langspeedapp.repositories.FolderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FolderService {

    private final FolderRepository folderRepository;
    private final AppUserDetailsService appUserDetailsService;

    public Optional<Folder> loadFolderById(Long folderId) {
        return folderRepository.findById(folderId);
    }

    public Folder getFolder(Long folderId) throws FolderNotFoundException {
        if (loadFolderById(folderId).isPresent()) {
            return loadFolderById(folderId).get();
        } else {
            throw new FolderNotFoundException("Could not find folder with ID " + folderId);
        }
    }

    public List<Folder> getAllFolders() {
        return folderRepository.findAll().stream()
                .sorted(Comparator.comparing(Folder::getTitle))
                .collect(Collectors.toList());
    }

    public List<StudySet> getFolderStudySets(Long folderId) throws FolderNotFoundException {
        return getFolder(folderId).getStudySets().stream()
                .sorted(Comparator.comparing(StudySet::getTitle))
                .collect(Collectors.toList());
    }

    public Folder addFolder(FolderRequest folderRequest) throws UserNotFoundException {
        Folder folder = new Folder(
                folderRequest.getTitle(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                appUserDetailsService.getAppUser(folderRequest.getOwnerId())
        );
        return folderRepository.save(folder);
    }

    public Long deleteFolder(Long folderId) throws FolderNotFoundException {
        Folder folder = getFolder(folderId);
        folderRepository.delete(folder);
        return folder.getId();
    }

    public Folder editFolder(Long folderId, FolderRequest folderRequest) throws FolderNotFoundException {
        Folder folder = getFolder(folderId);
        folder.setTitle(folderRequest.getTitle());
        return folderRepository.save(folder);
    }
}
