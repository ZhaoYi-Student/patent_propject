package com.example.patent.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
public class PPaymentList {

  private long id;
  @DateTimeFormat(pattern = "yyyy-MM-dd") //入参
  @JsonFormat(pattern = "yyyy-MM-dd") //出参
  private Date paymentCreatetime;
  @DateTimeFormat(pattern = "yyyy-MM-dd") //入参
  @JsonFormat(pattern = "yyyy-MM-dd") //出参
  private Date paymentExpirationDate;
  private String paymentNo;
  private long handInId;
  private long paymentRenewals;
  private List<PHandIn> pHandIn;


}
