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

@WebServlet("/loginServlet.do")
public class LoginServlet extends HttpServlet {

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
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		if (null != list && list.contains(userVO)) {
			resp.sendRedirect("show.jsp");
			System.out.println("登录成功");
		} else {
			resp.sendRedirect("login.jsp");
			System.out.println("没有此用户登录失败");
		}

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}

}
