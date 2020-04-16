package com.example.patent.mapper;

import com.example.patent.entity.PProcess;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PProcessMapper {

    List<PProcess> findAll();

}
