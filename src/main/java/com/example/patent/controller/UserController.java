package com.example.patent.controller;

import com.example.patent.entity.PUser;
import com.example.patent.service.PUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("UserCon")
public class UserController {

    /*自动注入Service*/
    @Autowired
    private PUserService pUserService;


    /*注销用户*/
    @RequestMapping("Sessionlogout")
    public boolean Sessionlogout(HttpSession session){

        //判断如果session中有数据 就清除
        if(session.getAttribute("userInfo")!=null){
            session.removeAttribute("userInfo");
            return true;
        }
        return false;
    }


    /*登录Controller*/
    @RequestMapping("login")
    public Boolean login(PUser pUser, HttpSession session) {

        /*调用业务逻辑*/
        PUser user = pUserService.PUserLogin(pUser);
        /*判断对象是否为空  */
        if (user != null) {
            /*存进Session中*/
            session.setAttribute("userInfo", user);
            return true;
        } else {
            return false;
        }

    }

}
