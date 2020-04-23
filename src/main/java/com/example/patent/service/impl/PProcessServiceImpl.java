package com.example.patent.service.impl;

import com.example.patent.entity.PProcess;
import com.example.patent.mapper.PProcessMapper;
import com.example.patent.service.PProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PProcessServiceImpl implements PProcessService {

    @Autowired
    private PProcessMapper pProcessMaper;

    @Override
    public List<PProcess> findAll() {
        return pProcessMaper.findAll();
    }
}
