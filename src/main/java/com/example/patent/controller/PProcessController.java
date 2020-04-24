package com.example.patent.controller;

import com.example.patent.entity.PProcess;
import com.example.patent.service.PProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("p_process")
public class PProcessController {

    @Autowired
    private PProcessService pProcessService;

    @RequestMapping("findAll")
    List<PProcess> findAll(){
        return pProcessService.findAll();
    }


}
