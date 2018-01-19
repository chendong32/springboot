package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dao.ShiroUserDao;
import com.pojo.ShiroUser;

@Controller
public class HelloController {
	
	@Autowired
	ShiroUserDao shiroUserDao;
	@RequestMapping("/index")
	public String queryUser(Model model){
		ShiroUser shiroUser  = shiroUserDao.querySql();
		List<ShiroUser> userlist = shiroUserDao.queryBySql(shiroUser);
	
		shiroUser.setUserName("a");
		shiroUserDao.queryRoleName(shiroUser);
		model.addAttribute("roleName", shiroUser.getRoleName());
		model.addAttribute("list", userlist);
		return "index";
	}
}
