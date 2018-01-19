package com.aspect;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

@Target({ElementType.PARAMETER, ElementType.METHOD})      
@Retention(RetentionPolicy.RUNTIME)
public @interface LogInfo {
	String value() default "";
}
