package com.example.patent.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 登录检查
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        Object username = request.getSession().getAttribute("userInfo");
        if(username == null) {
            //未登录，转发到登录页
            request.getRequestDispatcher("/login").forward(request, response);

            return false;
        }else {

            return true;
        }

    }

}
