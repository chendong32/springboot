<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>index</title>

<script type="text/javascript" src="js/jquery-3.2.1.js"></script>
<script type="text/javascript">
	
	function login(){
		var flag = true;
		$("form").attr("action","loginServlet.do"); 
		if($("input[name='userName']").val().trim().length==0){
			$("#message1").text("用户名不能为空");
			flag = false;
		}else{
			$("#message1").text("");
		}
		if($("input[name='password']").val().trim().length==0){
			$("#message2").text("密码不能为空");
			flag = false;
		}else{
			$("#message2").text("");
		}
		if(flag){
			$("form").submit();
		}
	}
	
	function register(){
		window.location.href="register.jsp";
	}

</script>
</head>
<body>
	<form action="#" method="get">
		<table>
			<tr><th colspan="2"><h3>欢迎来到JAVA的世界！</h3></th></tr>
			<tr>
				<td>用户名</td>
				<td><input type="text" name="userName" style="width:200px" />
					<span id="message1" style="color:red"></span>
				</td>
			</tr>
			<tr>
				<td>密码</td>
				<td><input type="password" name="password" style="width:200px" />
					<span id="message2" style="color:red"></span>
				</td>
			</tr>
			<tr><th colspan="2"><h3>
				<input type="button" onclick="login()" value="登录" />
				<input type="button" onclick="register()" value="注册" />
			</h3></th></tr>
		</table>
	</form>
</body>
</html>