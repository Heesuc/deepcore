package com.seo.toy.main;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainRestController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    MainService mainService;

    @GetMapping("/main/ajaxTest")
    public List<Map<String, Object>> ajaxTest(@RequestBody Map<String, Object> data) {
        logger.info("ㄱㄱㄱㄱㄱ");
        return mainService.selectTest();
    }

    @PostMapping("/main/postTest")
    public List<Map<String, Object>> postTest() {
        logger.info("포스트테스트!!");
        return mainService.selectTest();
    }
}
