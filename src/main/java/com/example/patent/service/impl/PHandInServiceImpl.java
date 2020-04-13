package com.example.patent.service.impl;

import com.example.patent.entity.PDept;
import com.example.patent.entity.PHandIn;
import com.example.patent.entity.PUser;
import com.example.patent.mapper.PDeptMapper;
import com.example.patent.mapper.PHandInMapper;
import com.example.patent.mapper.PUserMapper;
import com.example.patent.service.PHandInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PHandInServiceImpl implements PHandInService {

    @Autowired
    private PHandInMapper pHandInMapper;
    @Autowired
    private PDeptMapper pDeptMapper;
    @Autowired
    private PUserMapper pUserMapper;

    @Override
    public Boolean addHandIn(PHandIn pHandIn) {
        try {
            pHandIn.setHandInFrequency("1");
            pHandIn.setHandInProcess(1);
            pHandIn.setHandInAuditStatus(0);
            pHandIn.setHandInTime(new Date());
            int i = pHandInMapper.addHandIn(pHandIn);
            if (i == 1) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<PHandIn> ShowTabHandAndMoHu(PHandIn pHandIn) {
        List<PHandIn> pHandIns = pHandInMapper.PHandInList(pHandIn);
        for (PHandIn p : pHandIns
        ) {
            PDept deptById = pDeptMapper.findDeptById(p.getDeptId());
            PUser userById = pUserMapper.findUserById(p.getHandInApplicant());
            p.setPDept(deptById);
            p.setPUser(userById);
        }
        System.out.println(pHandIns);
        return pHandIns;
    }
}
