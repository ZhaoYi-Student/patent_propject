package com.example.patent.controller;

import com.example.patent.entity.PHandIn;
import com.example.patent.entity.PUser;
import com.example.patent.service.PHandInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("p_hand_in")
public class PHandInController {

    @Autowired
    private PHandInService pHandInService;


    /*模糊查询 加展示 所有信息*/
    @RequestMapping ("ShowTabHandAndMoHu")
    public List<PHandIn> ShowTabHandAndMoHu(PHandIn pHandIn){
        return pHandInService.ShowTabHandAndMoHu(pHandIn);
    }


    @RequestMapping("addHandIn")
    Boolean addHandIn(PHandIn pHandIn, HttpSession session) {
        PUser userInfo = (PUser) session.getAttribute("userInfo");
        pHandIn.setHandInApplicant(userInfo.getId());
        return pHandInService.addHandIn(pHandIn);
    }


}
