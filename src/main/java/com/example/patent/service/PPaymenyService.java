package com.example.patent.service;

import com.example.patent.entity.PPaymentList;

import java.util.List;

public interface PPaymenyService {

    List<PPaymentList> findAllByCondition();

}
