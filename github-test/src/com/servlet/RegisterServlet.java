package com.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.business.CommonBusiness;
import com.business.UserBusiness;
import com.pojo.UserVO;

@WebServlet("/registerServlet.do")
public class RegisterServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		CommonBusiness<UserVO> c= new CommonBusiness<UserVO>();
		String userdb = c.getUserdb(req);
		UserVO userVO = c.getVO(req, new UserVO());
		
		UserBusiness userBusiness = new UserBusiness();
		List<UserVO> list = new ArrayList<UserVO>();
		try {
			list = userBusiness.findUserInfo(userdb);
			if(null!=list&&list.size()==5){
				list.clear();
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		list.add(userVO);
		userBusiness.createUserInfo(list, userdb);
		resp.sendRedirect("show.jsp");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
	
	

}
