package com.example.patent.service.impl;

import com.example.patent.entity.PDept;
import com.example.patent.entity.PFile;
import com.example.patent.entity.PHandIn;
import com.example.patent.entity.PUser;
import com.example.patent.mapper.PDeptMapper;
import com.example.patent.mapper.PFileMapper;
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
    @Autowired
    private PFileMapper pFileMapper;

    @Override
    public Boolean addHandIn(PHandIn pHandIn) {
        try {
            int count = pFileMapper.pFileCount();
            pHandIn.setHandInFrequency("1");
            pHandIn.setHandInProcess(1);
            pHandIn.setHandInAuditStatus(0);
            pHandIn.setHandInTime(new Date());
            pHandIn.setFileId(count);
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
        for (PHandIn p : pHandIns) {
            PDept deptById = pDeptMapper.findDeptById(p.getDeptId());
            PUser userById = pUserMapper.findUserById(p.getHandInApplicant());
            PFile fileById = pFileMapper.findFileById(p.getFileId());
            p.setPDept(deptById);
            p.setPUser(userById);
            p.setPFile(fileById);
        }
        return pHandIns;
    }

    @Override
    public PHandIn FindByIdAll(Long id) {
        PHandIn pHandIn = pHandInMapper.FindByIdAll(id);
        PUser userById = pUserMapper.findUserById(pHandIn.getHandInApplicant());
        PFile fileById = pFileMapper.findFileById(pHandIn.getFileId());
        PDept deptById = pDeptMapper.findDeptById(pHandIn.getDeptId());

        pHandIn.setPDept(deptById);
        pHandIn.setPUser(userById);
        pHandIn.setPFile(fileById);
        return pHandIn;
    }
}
