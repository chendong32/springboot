<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>hello</title>
</head>
<body>
欢迎${user.userName}登录

您有角色访问该页面

<a href="<c:url value='/logout.html'/>"><button>退出登录</button></a>


<shiro:hasPermission name="u:create">
     <p><a href="admin.jsp">创建用户</a></p>
</shiro:hasPermission>
<shiro:hasPermission name="u:query">
     <p><a href="admin.jsp">查询用户</a></p>
</shiro:hasPermission>
<shiro:hasPermission name="u:delete">
     <p><a href="admin.jsp">删除用户</a></p>
</shiro:hasPermission>

</body>
</body>
</html>