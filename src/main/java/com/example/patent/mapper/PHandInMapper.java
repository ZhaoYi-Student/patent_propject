package com.example.patent.mapper;

import com.example.patent.entity.PHandIn;
import org.springframework.stereotype.Repository;

@Repository
public interface PHandInMapper {

    int addHandIn(PHandIn pHandIn);

}
