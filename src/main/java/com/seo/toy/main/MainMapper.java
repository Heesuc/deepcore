package com.seo.toy.main;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MainMapper {
	
	List<Map<String, Object>> selectTest(Map<String, Object> params);
}
