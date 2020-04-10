package com.example.patent.utils;

import com.example.patent.entity.PUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 登录检查
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {


    @Autowired
    private HttpSession session;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {


        PUser userInfo = (PUser) session.getAttribute("userInfo");
        System.out.println(userInfo+"_____");
        if(userInfo == null) {
            //未登录，转发到登录页
            request.getRequestDispatcher("/login").forward(request, response);

            return false;
        }else {
            return true;
        }

    }

}
