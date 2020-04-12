package com.example.patent.service.impl;

import com.example.patent.entity.PHandIn;
import com.example.patent.mapper.PHandInMapper;
import com.example.patent.service.PHandInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PHandInServiceImpl implements PHandInService {

    @Autowired
    private PHandInMapper pHandInMapper;

    @Override
    public Boolean addHandIn(PHandIn pHandIn) {
        try {
            pHandIn.setHandInFrequency("1");
            pHandIn.setHandInProcess(1);
            pHandIn.setHandInAuditStatus(0);
            pHandIn.setHandInTime(new Date());
            int i = pHandInMapper.addHandIn(pHandIn);
            if (i == 1) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
