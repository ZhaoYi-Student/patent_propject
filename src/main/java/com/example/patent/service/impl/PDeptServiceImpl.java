package com.example.patent.service.impl;

import com.example.patent.entity.PDept;
import com.example.patent.mapper.PDeptMapper;
import com.example.patent.service.PDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PDeptServiceImpl implements PDeptService {

    @Autowired
    private PDeptMapper pDeptMapper;

    @Override
    public List<PDept> ShowDeptName() {
        return pDeptMapper.ShowDeptName();
    }
}
