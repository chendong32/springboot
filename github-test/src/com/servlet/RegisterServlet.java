package com.servlet;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;

import com.business.UserBusiness;
import com.pojo.UserVO;

@WebServlet("/registerServlet.do")
public class RegisterServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		String userdb = req.getSession().getServletContext().getRealPath("");
		Map<String, String[]> parameterMap = req.getParameterMap();
		UserVO userVO = new UserVO();
		try {
			BeanUtils.copyProperties(userVO, parameterMap);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
