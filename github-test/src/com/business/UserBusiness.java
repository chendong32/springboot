package com.business;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.dao.UserDao;
import com.pojo.UserVO;

public class UserBusiness {
	
	public Boolean doRegister(String userdb,UserVO userVO) throws IOException{
		Boolean flag = true;
		UserDao userDao = new UserDao();
		List<UserVO> list = userDao.findUserInfo(userdb);
		if (null != list && list.size() == 5) {
			list.clear();
		}
		list.add(userVO);
		userDao.createUserInfo(list, userdb);
		return flag;
	}

	private Boolean doLogin(String userdb, UserVO userVO) throws IOException {
		Boolean flag = false;
		UserDao userDao = new UserDao();
		List<UserVO> list = userDao.findUserInfo(userdb);
		if (null != list && list.contains(userVO)) {
			System.out.println("登录成功");
			flag = true;
		} else {
			System.out.println("没有此用户登录失败");
		}
		return flag;
	}

	public Boolean doBusiness(HttpServletRequest req, UserVO vo,String opr) throws IOException {
		CommonBusiness<UserVO> c = new CommonBusiness<UserVO>();
		String userdb = c.getUserdb(req);
		UserVO userVO = c.getVO(req, vo);
		if (opr.equals("register")) {
			return doRegister(userdb,userVO); 
		} else {
			return doLogin(userdb,userVO); 
		}
	}
	
}
