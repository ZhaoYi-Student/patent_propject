package com.example.patent.entity;


import lombok.Data;
import java.util.Date;

@Data
public class PTechnicalSolutions {

  private long id;
  private String tSName;
  private Date tSTime;
  private long tSAuthorId;
  private long tSAuditId;
  private String creatorOpinion;
  private String technicalDirectorOpinion;
  private String mutualReviewOpinion;
  private String technicalDirectorEndOpinion;

}
