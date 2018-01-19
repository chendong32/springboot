package com.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.ShiroUserDao;
import com.pojo.ShiroUser;

@Service
public class ShiroUserBusiness {
	@Autowired
	ShiroUserDao shiroUserDao;

	public ShiroUser selectById(int id) {
		return shiroUserDao.queryByPrimaryKey(id);
	}
}
