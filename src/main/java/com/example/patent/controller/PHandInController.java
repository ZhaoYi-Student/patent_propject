package com.example.patent.controller;

import com.example.patent.entity.PHandIn;
import com.example.patent.entity.PUser;
import com.example.patent.service.PHandInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("p_hand_in")
public class PHandInController {

    @Autowired
    private PHandInService pHandInService;

    @RequestMapping("addHandIn")
    Boolean addHandIn(PHandIn pHandIn, HttpSession session) {
        PUser userInfo = (PUser) session.getAttribute("userInfo");
        pHandIn.setHandInApplicant(userInfo.getId());
        return pHandInService.addHandIn(pHandIn);
    }

}
