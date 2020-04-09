package com.example.patent.service.impl;

import com.example.patent.entity.PUser;
import com.example.patent.mapper.PUserMapper;
import com.example.patent.service.PUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*UserService 实现类*/
@Service
public class PUserServiceImpl implements PUserService {

    /*自动注入Mapper*/
    @Autowired
    private PUserMapper pUserMapper;

    /*登录方法实现*/
    @Override
    public PUser PUserLogin(PUser pUser) {
        return pUserMapper.PUserLogin(pUser);
    }
}
