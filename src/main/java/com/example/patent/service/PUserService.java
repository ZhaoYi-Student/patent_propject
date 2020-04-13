package com.example.patent.service;

import com.example.patent.entity.PUser;

import java.util.List;

/*UserService接口*/
public interface PUserService {

    PUser PUserLogin(PUser pUser);

    List<PUser> fingHandInApplicant();
}
