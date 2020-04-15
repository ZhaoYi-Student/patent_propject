package com.example.patent.controller;

import com.example.patent.entity.PPaymentList;
import com.example.patent.service.PPaymenyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("p_payment_list")
public class PPaymentListController {

    @Autowired
    private PPaymenyService pPaymenyService;

    @RequestMapping("findAllByCondition")
    List<PPaymentList> findAllByCondition(){
        return pPaymenyService.findAllByCondition();
    }


}
