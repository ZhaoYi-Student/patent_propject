package com.example.patent.mapper;

import com.example.patent.entity.PLevel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PLevelMapper {

    List<PLevel> findAll();

    PLevel findById(long id);

}
