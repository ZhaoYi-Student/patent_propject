package com.example.patent.service;

import com.example.patent.entity.PPaymentList;

import java.util.List;

public interface PPaymenyService {

    List<PPaymentList> findAllByCondition(String handInName,String handInApplicant,String handInAuditor) throws InterruptedException;

    Boolean addppayment(PPaymentList PPaymentList);
}
