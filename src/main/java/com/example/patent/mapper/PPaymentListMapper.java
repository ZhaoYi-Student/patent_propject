package com.example.patent.mapper;

import com.example.patent.entity.PPaymentList;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PPaymentListMapper {

    List<PPaymentList> findAll();

    int addppayment(PPaymentList PPaymentList);
}
