package com.seo.toy.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
	
	@Autowired MainService mainService;
	
	@GetMapping("/")
	public String test(Model model) {
		model.addAttribute("mainModelList", mainService.selectTest());
		System.out.println(model.getAttribute("mainModelList"));
		return "main/main";
	}
}
