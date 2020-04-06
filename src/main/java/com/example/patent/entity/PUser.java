package com.example.patent.entity;

import lombok.Data;

@Data
public class PUser {

  private long id;
  private String userName;
  private String realName;
  private String userPwd;
  private long level;

}
