package com.business;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;


public class CommonBusiness<T> {
	
	public String getUserdb(HttpServletRequest req){
		String realPath = req.getSession().getServletContext().getRealPath("");
		String[] db = realPath.replaceAll("\\\\", "/").split("/");
		StringBuffer userdb = new StringBuffer();
		userdb.append(db[0])
			.append("/")
			.append(db[1])
			.append("/")
			.append(db[2])
			.append("/")
			.append(db[db.length-1])
			.append("/userdb");
		return userdb.toString();
	}
	
	public T getVO(HttpServletRequest req,T vo){
		Map<String, String[]> parameterMap = req.getParameterMap();
		try {
			BeanUtils.copyProperties(vo, parameterMap);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		return vo;
	}
}
