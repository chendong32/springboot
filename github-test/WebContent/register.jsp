<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>register</title>

<script type="text/javascript" src="js/jquery-3.2.1.js"></script>
<script type="text/javascript">
	
	function do_register(){
		var flag = true;
		$("form").attr("action","registerServlet.do"); 
		if($("input[name='userName']").val().trim().length==0){
			$("#message1").text("用户名不能为空");
			flag = false;
		}else{
			$("#message1").text("");
		}
		if($("input[name='nikeName']").val().trim().length==0){
			$("#message2").text("昵称不能为空");
			flag = false;
		}else{
			$("#message2").text("");
		}
		if($("input[name='password']").val().trim().length==0){
			$("#message3").text("密码不能为空");
			flag = false;
		}else{
			$("#message3").text("");
		}
		if($("input[name='passwordCheck']").val().trim()!=$("input[name='password']").val().trim()){
			$("#message4").text("两次密码不一致");
			flag = false;
		}else{
			$("#message4").text("");
		}
		if($("input[name='codeCheck']").val().trim().length==0){
			$("#message5").text("验证码不正确");
			flag = false;
		}else{
			$("#message5").text("");
		}
		if(flag){
			$("form").submit();
		}
	}

</script>
</head>
<body>
	<form action="#" method="get">
		<table>
			<tr><th colspan="2"><h3>请填写相关注册信息！</h3></th></tr>
			<tr>
				<td>用户名</td>
				<td><input type="text" name="userName" style="width:200px" />
					<span id="message1" style="color:red"></span>
				</td>
			</tr>
			<tr>
				<td>昵称</td>
				<td><input type="text" name="nikeName" style="width:200px" />
					<span id="message2" style="color:red"></span>
				</td>
			</tr>
			<tr>
				<td>密码</td>
				<td><input type="password" name="password" style="width:200px" />
					<span id="message3" style="color:red"></span>
				</td>
			</tr>
			<tr>
				<td>确认密码</td>
				<td><input type="password" name="passwordCheck" style="width:200px" />
					<span id="message4" style="color:red"></span>
				</td>
			</tr>
			<tr>
				<td>验证码</td>
				<td><input type="text" name="codeCheck" style="width:200px" />
					<span id="message5" style="color:red"></span>
				</td>
			</tr>
			<tr><th colspan="2"><h3>
				<input type="button" onclick="do_register()" value="注册" />
				<input type="reset" value="重置" />
			</h3></th></tr>
		</table>
	</form>
</body>
</html>