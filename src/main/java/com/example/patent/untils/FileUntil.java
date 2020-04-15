package com.example.patent.untils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.*;
import sun.plugin2.ipc.windows.WindowsIPCFactory;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class FileUntil {

    // Endpoint以杭州为例，其它Region请按实际情况填写。
    private static final String endpoint = "http://oss-cn-hangzhou.aliyuncs.com";
    // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
    private static final String accessKeyId = "LTAI4FuYBzB3ShsaMjhAn26Z";
    private static final String accessKeySecret = "xK1lndT7FutLYQ2hOGNZxTccXosFmQ";
    private static final String bucketName = "patent-file1";
    private static final String path = "D://patent-file/";
    private static final OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

    public static String fileUpload(String fileName) {
        String name = new Date().getTime() + UUID.randomUUID().toString();

// 创建OSSClient实例。

        if (!ossClient.doesBucketExist(bucketName)) {
            CreateBucketRequest createBucketRequest = new CreateBucketRequest(bucketName);
            // 如果创建存储空间的同时需要指定存储类型以及数据容灾类型, 可以参考以下代码。
// 此处以设置存储空间的存储类型为标准存储为例。
// createBucketRequest.setStorageClass(StorageClass.Standard);
// 默认情况下，数据容灾类型为本地冗余存储，即DataRedundancyType.LRS。如果需要设置数据容灾类型为同城冗余存储，请替换为DataRedundancyType.ZRS。
// createBucketRequest.setDataRedundancyType(DataRedundancyType.ZRS)

// 创建存储空间。
            ossClient.createBucket(createBucketRequest);
        }

// 创建PutObjectRequest对象。
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, name, new File(path + fileName));

// 如果需要上传时设置存储类型与访问权限，请参考以下示例代码。
// ObjectMetadata metadata = new ObjectMetadata();
// metadata.setHeader(OSSHeaders.OSS_STORAGE_CLASS, StorageClass.Standard.toString());
// metadata.setObjectAcl(CannedAccessControlList.Private);
// putObjectRequest.setMetadata(metadata);

// 上传文件。
        ossClient.putObject(putObjectRequest);

// 关闭OSSClient。
        ossClient.shutdown();
        return name;
    }


    public static String downloadFile(String filepath) {
        String path = "D://A-patent-file/";
        File file = new File(path);
        if (!file.exists()) {
            boolean mkdirs = file.mkdirs();
        }
        ossClient.getObject(new GetObjectRequest(bucketName, filepath), new File(path + filepath + ".docx"));
        return path + filepath + ".docx";
    }

}
