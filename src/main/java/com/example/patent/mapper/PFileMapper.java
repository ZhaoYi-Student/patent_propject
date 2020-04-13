package com.example.patent.mapper;

import com.example.patent.entity.PFile;
import org.springframework.stereotype.Repository;

@Repository
public interface PFileMapper {

    int addFile(PFile pFile);

    PFile findFileById(Long id);

    int pFileCount();
}
