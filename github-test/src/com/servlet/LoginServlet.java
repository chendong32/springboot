package com.servlet;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import com.business.UserBusiness;
import com.pojo.UserVO;

@Component
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Resource
	UserBusiness userBusiness;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	
		Boolean flag = userBusiness.doBusiness(req, new UserVO());
		
		if (flag) {
			resp.sendRedirect("show.jsp");
		} else {
			resp.sendRedirect("login.jsp");
		}

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}

}
