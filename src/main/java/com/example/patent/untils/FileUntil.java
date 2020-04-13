package com.example.patent.untils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectRequest;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FileUntil {

    // Endpoint以杭州为例，其它Region请按实际情况填写。
    String endpoint = "http://oss-cn-beijing.aliyuncs.com";
    // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
    String accessKeyId = "LTAI4FuYBzB3ShsaMjhAn26Z";
    String accessKeySecret = "xK1lndT7FutLYQ2hOGNZxTccXosFmQ";
    String bucketName = "czylmz";

    public Boolean fileUpload(String fileName) {
        try {

// 创建OSSClient实例。
            OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

// 创建PutObjectRequest对象。
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, "patent", new File(fileName));

// 如果需要上传时设置存储类型与访问权限，请参考以下示例代码。
// ObjectMetadata metadata = new ObjectMetadata();
// metadata.setHeader(OSSHeaders.OSS_STORAGE_CLASS, StorageClass.Standard.toString());
// metadata.setObjectAcl(CannedAccessControlList.Private);
// putObjectRequest.setMetadata(metadata);

// 上传文件。
            ossClient.putObject(putObjectRequest);

// 关闭OSSClient。
            ossClient.shutdown();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}