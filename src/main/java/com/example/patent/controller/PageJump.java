package com.example.patent.controller;

import com.example.patent.entity.PUser;
import com.example.patent.service.PUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class PageJump {

    @RequestMapping("login")
    public String login(){
        return "login";
    }

    @RequestMapping("index")
    public String index(){
        return "index";
    }

    @RequestMapping("welcome")
    public String welcome(){
        return "welcome";
    }

    @RequestMapping("page_1")
    public String page_1(){
        return "page/page_1";
    }

    @RequestMapping("page_2")
    public String page_2(){
        return "page/page_2";
    }

    @RequestMapping("page_3")
    public String page_3(){
        return "page/page_3";
    }

    @RequestMapping("add_hand_in")
    public String add_hand_in(){
        return "page/add_hand_in";
    }


}
