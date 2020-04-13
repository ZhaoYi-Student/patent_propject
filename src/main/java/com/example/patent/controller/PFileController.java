package com.example.patent.controller;

import com.example.patent.entity.PFile;
import com.example.patent.service.PFileService;
import com.example.patent.untils.FileUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("p_file")
public class PFileController {

    @Autowired
    private PFileService pFileService;

    @RequestMapping("addFile")
    Boolean addFile(MultipartFile multipartFile) throws IOException {

        synchronized (this) {
            String originalFilename = multipartFile.getOriginalFilename();
            String path = "D://patent-file/";
            String fileName = UUID.randomUUID() + originalFilename.trim();
            File file = new File(path + fileName);
            if (!file.exists()) {
                file.mkdirs();
            }
            try {
                multipartFile.transferTo(file);
                String s = FileUntil.fileUpload(fileName);
                PFile pFile = new PFile();
                pFile.setFileName(s);
                pFile.setFilePath("https://patent-file1.oss-cn-hangzhou.aliyuncs.com/" + s);
                return pFileService.addFile(pFile);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
    }
}
