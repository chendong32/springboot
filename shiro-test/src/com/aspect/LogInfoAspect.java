package com.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogInfoAspect {

/*	@Around("@annotation(logInfo)")
	public Object Around(ProceedingJoinPoint pJoinPoint, LogInfo logInfo) throws Throwable {
		System.out.println("环绕--前置");
		
		MethodSignature signature = (MethodSignature) pJoinPoint.getSignature();
		String[] parameterNames = signature.getParameterNames();
		Map<String, Object> map = new HashMap<String, Object>();
		Object[] args = pJoinPoint.getArgs();
		for (int i = 0; i < args.length; i++) {
			map.put(parameterNames[i], args[i]);
		}
		System.out.println(logInfo.value());
		for (Iterator<Map.Entry<String, Object>> iterator = map.entrySet().iterator(); iterator.hasNext();) {
			Map.Entry<String, Object> entry = iterator.next();
			System.out.println(entry.getKey() + ":" + entry.getValue());
		}

		System.out.println(logInfo.value());
		Object proceed = pJoinPoint.proceed();
		System.out.println("环绕--后置");
		return proceed;
	}*/
	
	@Before("@annotation(logInfo)")
	public void before(JoinPoint joinPoint,LogInfo logInfo){
		for (int i = 0; i < joinPoint.getArgs().length; i++) {
			System.out.println(joinPoint.getArgs()[i]);
		}
		System.out.println("前置增强");
	}
}
