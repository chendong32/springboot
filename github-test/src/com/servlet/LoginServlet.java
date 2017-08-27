package com.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.business.UserBusiness;
import com.pojo.UserVO;

@WebServlet("/loginServlet.do")
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String opr = "login";
		UserBusiness userBusiness = new UserBusiness();
		Boolean flag = userBusiness.doBusiness(req, new UserVO(),opr);
		
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
