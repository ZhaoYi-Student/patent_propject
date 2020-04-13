package com.example.patent.controller;

import com.example.patent.service.PFileService;
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

    Boolean addFile(MultipartFile multipartFile) throws IOException {

        String originalFilename = multipartFile.getOriginalFilename();
        UUID uuid = UUID.randomUUID();
        multipartFile.transferTo(new File(uuid+originalFilename));

        return false;
    }


}
