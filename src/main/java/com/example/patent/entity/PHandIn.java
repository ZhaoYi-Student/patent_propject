package com.example.patent.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

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
    @DateTimeFormat(pattern = "yyyy-MM-dd") //入参
    @JsonFormat(pattern = "yyyy-MM-dd") //出参
    private Date handInTime;
    private long handInImportanceLevel;
    private long handInApplicant;
    private String handInFrequency;
    private long handInProcess;
    private String pTSId;
    private long pTSEndId;
    private String supervisorOpinion;
    private String technicalPersonOpinion;
    private long deptId;
    private long fileId;
    private PDept pDept;
    private PUser pUser;
    private PFile pFile;

}
