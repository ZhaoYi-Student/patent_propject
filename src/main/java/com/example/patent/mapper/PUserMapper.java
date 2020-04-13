package com.example.patent.mapper;

import com.example.patent.entity.PUser;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PUserMapper {

    /*登录Mapper*/
    PUser PUserLogin(PUser pUser);

    PUser findUserById(Long id);

    //page2.html的申请人下拉框
    List<PUser> fingHandInApplicant();
}
