package com.seo.toy.main;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainService {

	@Autowired MainMapper mainMapper;
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass().getSimpleName());

	public void log() {
		logger.trace("Trace");
		logger.debug("Debug");
		logger.info("Info");
		logger.warn("Warn");
		logger.error("Error");
	}
	
	public List<Map<String, Object>> selectTest() {
		
		Map<String, Object> params = new HashMap<>();
		params.put("column1", "칼럼1_1");
		
		List<Map<String, Object>> result = mainMapper.selectTest(params);
		log();
		
		return result;
	}
	
}
