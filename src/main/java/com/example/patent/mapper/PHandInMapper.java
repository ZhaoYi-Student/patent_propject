package com.example.patent.mapper;

import com.example.patent.entity.PHandIn;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PHandInMapper {


    int addHandIn(PHandIn pHandIn);

    List<PHandIn> PHandInList(PHandIn pHandIn);

    PHandIn FindByIdAll(@Param("id") Long id);

    PHandIn findShenheContent(@Param("id") Long id);

    Boolean applyReject(@Param("id") Long id);

    Boolean applyPass(Long id);
}
