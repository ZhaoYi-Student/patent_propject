package com.example.patent.service.impl;

import com.example.patent.entity.PFile;
import com.example.patent.mapper.PFileMapper;
import com.example.patent.service.PFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PFileServiceImpl implements PFileService {

    @Autowired
    private PFileMapper pFileMapper;

    @Override
    public Boolean addFile(PFile pFile) {
        int i = pFileMapper.addFile(pFile);
        if (i==1){
            return true;
        }
        return false;
    }
}
