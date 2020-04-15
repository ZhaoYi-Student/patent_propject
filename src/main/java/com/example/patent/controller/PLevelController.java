package com.example.patent.controller;

import com.example.patent.entity.PHandIn;
import com.example.patent.entity.PLevel;
import com.example.patent.service.PHandInService;
import com.example.patent.service.PLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("p_level")
public class PLevelController {

    @Autowired
    private PLevelService pLevelService;
    @Autowired
    private PHandInService pHandInService;

    @RequestMapping("findAllByCondition")
    List<PHandIn> findAllByCondition(PHandIn pHandIn, String pLevelId) {
        PLevel byId = pLevelService.findById(Long.parseLong(pLevelId));
        String[] split = byId.getProcess().split(",");
        List<PHandIn> pHandInList = new ArrayList<>();
        for (int a = 0; a < split.length; a++) {
            pHandIn.setHandInProcess(Long.parseLong(split[a]));
            List<PHandIn> pHandInList1 = pHandInService.ShowTabHandAndMoHu(pHandIn);
            pHandInList.addAll(pHandInList1);
        }
        return pHandInList;
    }


}
