package com.example.patent.mapper;

import com.example.patent.entity.PHandIn;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PHandInMapper {

    List<PHandIn> PHandInList();

    int addHandIn(PHandIn pHandIn);

}
