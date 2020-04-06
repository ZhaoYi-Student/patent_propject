package com.example.patent.entity;

import lombok.Data;

import java.util.Date;
@Data
public class PHandIn {

  private long id;
  private String handInName;
  private String handInInventor;
  private String handInNo;
  private long handInSchedule;
  private String handInAuditor;
  private String handInAuditInformation;
  private long handInAuditStatus;
  private Date handInTime;
  private long handInImportanceLevel;
  private long handInApplicant;
  private long deptId;
  private String handInFrequency;
  private long handInProcess;
  private String pTSId;
  private long pTSEndId;


}
