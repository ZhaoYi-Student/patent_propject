package com.example.patent.mapper;

import com.example.patent.entity.PDept;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.List;

@Component
public interface PDeptMapper {

    /*查找部门*/
    List<PDept> ShowDeptName();

}
