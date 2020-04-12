package com.example.patent.controller;

import com.example.patent.entity.PDept;
import com.example.patent.service.PDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


/*部门 */
@Controller
@RequestMapping("DeptCon")
public class DeptController {

    @Autowired
    private PDeptService pDeptService;

    /*查询所有部门*/
    @RequestMapping("ShowDeptName")
    @ResponseBody
    public List<PDept> ShowDeptName(){

        List<PDept> list= pDeptService.ShowDeptName();
        for (PDept l:list
             ) {
            System.out.println(l);

        }

        return pDeptService.ShowDeptName();
    }



}
