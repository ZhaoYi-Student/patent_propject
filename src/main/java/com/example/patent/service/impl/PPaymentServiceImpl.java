package com.example.patent.service.impl;

import com.example.patent.entity.PHandIn;
import com.example.patent.entity.PPaymentList;
import com.example.patent.mapper.PHandInMapper;
import com.example.patent.mapper.PPaymentListMapper;
import com.example.patent.service.PPaymenyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PPaymentServiceImpl implements PPaymenyService {

    @Autowired
    private PPaymentListMapper pPaymentListMapper;
    @Autowired
    private PHandInMapper pHandInMapper;

    @Override
    public List<PPaymentList> findAllByCondition() {

        List<PPaymentList> all = pPaymentListMapper.findAll();
        PHandIn pHandIn = new PHandIn();
        for (PPaymentList p:all
             ) {
            pHandIn.setId(p.getHandInId());
            List<PHandIn> pHandIns = pHandInMapper.PHandInList(pHandIn);
            p.setPHandIn(pHandIns.get(0));
        }
        System.out.println(all);
        return all;
    }
}
