package com.example.patent.controller;

import com.example.patent.entity.PUser;
import com.example.patent.service.PUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class PageJump {

    /*自动注入Service*/
    @Autowired
    private PUserService pUserService;

    /*登录Controller*/
    @RequestMapping("login")
    public PUser login(PUser pUser, HttpSession session){

        /*调用业务逻辑*/
        PUser user = pUserService.PUserLogin(pUser);

        /*判断对象是否为空  */
        if(user!=null){
            /*存进Session中*/
            session.setAttribute("UserLogin",user);
        }

        return user;
    }

    @RequestMapping("index")
    public String index(){
        return "index";
    }

    @RequestMapping("welcome")
    public String welcome(){
        return "welcome";
    }

}
