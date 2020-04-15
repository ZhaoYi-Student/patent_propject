package com.example.patent.service;

import com.example.patent.entity.PHandIn;
import com.example.patent.entity.PLevel;

import java.util.List;

public interface PLevelService {

    List<PLevel> findAll();

    PLevel findById(long pLevelId);

}
