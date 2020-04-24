package com.example.patent.service;

import com.example.patent.entity.PFile;

public interface PFileService {

    Boolean addFile(PFile pFile);

    PFile findFileById(Long id);

}
