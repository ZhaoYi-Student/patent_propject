package com.example.patent.controller;

import com.example.patent.entity.PPaymentList;
import com.example.patent.entity.PUser;
import com.example.patent.service.PPaymenyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("p_payment_list")
public class PPaymentListController {

    @Autowired
    private PPaymenyService pPaymenyService;

    @RequestMapping("findAllByCondition")
    @ResponseBody
    List<PPaymentList> findAllByCondition(String handInName,String handInApplicant,String handInAuditor) throws InterruptedException {
        return pPaymenyService.findAllByCondition(handInName,handInApplicant,handInAuditor);
    }

    @RequestMapping("addPPayment")
    @ResponseBody
    Boolean addPPayment(PPaymentList pPaymentList, HttpSession httpSession){

        PUser pUser= (PUser) httpSession.getAttribute("userInfo");

        pPaymentList.setPaymentRenewals(pUser.getId());

        return pPaymenyService.addppayment(pPaymentList);
    }
}
