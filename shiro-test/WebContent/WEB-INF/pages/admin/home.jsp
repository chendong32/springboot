<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>home</title>
</head>
<body>
欢迎${user.userName}登录
<a href="<c:url value='/logout.html'/>"><button>退出登录</button></a>
<p><a href="<c:url value='/admin/auth'/>">根据角色显示对应信息，页面跳转admin/auth</a></p>
<p><a href="<c:url value='/admin/role'/>">只有admin可操作，页面跳转admin/role</a></p>
</body>
</body>
</html>