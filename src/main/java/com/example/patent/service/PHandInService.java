package com.example.patent.service;

import com.example.patent.entity.PHandIn;
import com.example.patent.mapper.PHandInMapper;

import java.util.List;

public interface PHandInService {

    Boolean addHandIn(PHandIn pHandIn);


    List<PHandIn> ShowTabHandAndMoHu(PHandIn pHandIn);
}
