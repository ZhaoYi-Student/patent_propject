package com.example.patent.service;

import com.example.patent.entity.PHandIn;
import com.example.patent.mapper.PHandInMapper;

import java.util.List;

public interface PHandInService {

    Boolean addHandIn(PHandIn pHandIn);


    List<PHandIn> ShowTabHandAndMoHu(PHandIn pHandIn);

    PHandIn FindByIdAll(Long id);

    PHandIn findShenheContent(Long id);

    Boolean applyReject(Long id);

    Boolean applyPass(Long id);
}
