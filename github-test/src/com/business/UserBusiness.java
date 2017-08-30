package com.business;

import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import com.dao.UserDao;
import com.pojo.UserVO;

@Component
public class UserBusiness {
	
	@Resource
	CommonBusiness<UserVO> commonBusiness;
	
	@Resource
	UserDao userDao;
	
	public Boolean doRegister(String userdb,UserVO userVO) throws IOException{
		Boolean flag = true;
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
		List<UserVO> list = userDao.findUserInfo(userdb);
		if (null != list && list.contains(userVO)) {
			System.out.println("登录成功");
			flag = true;
		} else {
			System.out.println("没有此用户登录失败");
		}
		return flag;
	}

	public Boolean doBusiness(HttpServletRequest req, UserVO vo) throws IOException {
		Pattern pattern = Pattern.compile("login");
		Matcher matcher = pattern.matcher(req.getRequestURI());
		String userdb = commonBusiness.getUserdb(req);
		UserVO userVO = commonBusiness.getVO(req, vo);
		if (matcher.find()) {
			return doLogin(userdb,userVO); 			
		} else {
			return doRegister(userdb,userVO);  
		}
	}
	
}
