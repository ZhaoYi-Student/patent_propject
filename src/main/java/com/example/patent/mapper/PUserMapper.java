package com.example.patent.mapper;

import com.example.patent.entity.PUser;
import org.springframework.stereotype.Component;

@Component
public interface PUserMapper {

    /*登录Mapper*/
    PUser PUserLogin(PUser pUser);

}
