package com.seo.toy.test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
	
	Logger logger = LoggerFactory.getLogger(TestController.class);
	
    @GetMapping("/test")
    public String logTest(String str){
        try {
            str.toString();
        } catch (NullPointerException e){
        	logger.trace("가장 디테일한 로그");
        	logger.debug("디버깅용 로그");
        	logger.warn("경고");
        	logger.info("정보성 로그");
        	logger.error("에러!", e);
        }
        return "test/test";
    }
}
