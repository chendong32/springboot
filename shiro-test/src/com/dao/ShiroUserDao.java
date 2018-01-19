package com.dao;

import java.util.List;

import com.pojo.ShiroUser;

public interface ShiroUserDao {
	
	ShiroUser queryByPrimaryKey(int id);
	
	void queryRoleName(ShiroUser shiroUser);
	
	ShiroUser querySql();
	
	List<ShiroUser> queryBySql(ShiroUser shiroUser);
}
