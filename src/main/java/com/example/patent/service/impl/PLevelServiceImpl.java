package com.example.patent.service.impl;

import com.example.patent.entity.PHandIn;
import com.example.patent.entity.PLevel;
import com.example.patent.mapper.PHandInMapper;
import com.example.patent.mapper.PLevelMapper;
import com.example.patent.service.PLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PLevelServiceImpl implements PLevelService {

    @Autowired
    private PLevelMapper pLevelMapper;

    @Override
    public List<PLevel> findAll() {
        return pLevelMapper.findAll();
    }

    @Override
    public PLevel findById(long pLevelId) {
        return pLevelMapper.findById(pLevelId);
    }


}
