package com.example.patent.entity;

import lombok.Data;

import java.util.Date;

@Data
public class PDept {

  private long id;
  private String deptName;
  private String deptInformation;
  private Date deptCreatetime;


}
