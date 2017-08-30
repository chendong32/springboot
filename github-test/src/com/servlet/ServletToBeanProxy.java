package com.servlet;

import java.io.IOException;

import javax.servlet.GenericServlet;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 * 实现一个代理类将Servlet转为Spring管理的Servlet Bean
 */
@SuppressWarnings("serial")
public class ServletToBeanProxy extends GenericServlet {

	private String targetBean;
	private Servlet proxy;

	@Override
	public void init() throws ServletException {
		super.init();
		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());
		this.targetBean = getServletName();
		this.proxy = (Servlet) wac.getBean(targetBean);
		proxy.init(getServletConfig());
	}

	@Override
	public void service(ServletRequest arg0, ServletResponse arg1) throws ServletException, IOException {
		proxy.service(arg0, arg1);
	}

}
