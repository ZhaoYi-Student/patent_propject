package com.example.patent.service.impl;

import com.example.patent.entity.PHandIn;
import com.example.patent.entity.PPaymentList;
import com.example.patent.mapper.PHandInMapper;
import com.example.patent.mapper.PPaymentListMapper;
import com.example.patent.service.PPaymenyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PPaymentServiceImpl implements PPaymenyService {

    private final PPaymentListMapper pPaymentListMapper;
    private final PHandInMapper pHandInMapper;

    @Autowired
    public PPaymentServiceImpl(PPaymentListMapper pPaymentListMapper, PHandInMapper pHandInMapper) {
        this.pPaymentListMapper = pPaymentListMapper;
        this.pHandInMapper = pHandInMapper;
    }

    @Override
    public List<PPaymentList> findAllByCondition(String handInName, String handInApplicant, String handInAuditor) throws InterruptedException {

        Thread.sleep(1000);
        List<PPaymentList> all1 = pPaymentListMapper.findAll();
        List<PPaymentList> paymentLists = new ArrayList<>();
        PHandIn pHandIn = new PHandIn();
        pHandIn.setHandInName(handInName);
        pHandIn.setHandInAuditor(handInAuditor);

        for (PPaymentList p : all1
        ) {
            pHandIn.setId(p.getHandInId());
            List<PHandIn> pHandIns = pHandInMapper.PHandInList(pHandIn);
            if (pHandIns != null && pHandIns.size() > 0) {
                p.setPHandIn(pHandIns);
            }
            paymentLists.add(p);
        }
        System.out.println(paymentLists);
        return paymentLists;
    }

    @Override
    public Boolean addppayment(PPaymentList PPaymentList) {

        int a=pPaymentListMapper.addppayment(PPaymentList);
        if(a>0){
            return true;
        }
        return false;
    }
}
