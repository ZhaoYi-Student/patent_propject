package com.example.patent.entity;

import lombok.Data;

@Data
public class PMessageList {

  private long id;
  private String message;
  private String messageSender;
  private String messageReceiver;

}
