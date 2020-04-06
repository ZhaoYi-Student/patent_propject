package com.example.patent.entity;


import lombok.Data;

import java.util.Date;

@Data
public class PPaymentList {

  private long id;
  private Date paymentCreatetime;
  private Date paymentExpirationDate;
  private String paymentNo;
  private long handInId;
  private long paymentRenewals;

}
