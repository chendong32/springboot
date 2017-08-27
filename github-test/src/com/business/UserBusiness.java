package com.business;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.List;

import com.pojo.UserVO;

public class UserBusiness {
	
	public void createUserInfo(List<UserVO> list,String userdb) throws IOException{
		
		File file = new File(userdb);
		FileOutputStream os = new FileOutputStream(file);  
        ObjectOutputStream oos = new ObjectOutputStream(os);
        oos.writeObject(list);
        oos.close();
        
	}
	
	@SuppressWarnings("unchecked")
	public List<UserVO> findUserInfo(String userdb) throws IOException, ClassNotFoundException{
		
		FileInputStream is = new FileInputStream(userdb);
		ObjectInputStream ois = new ObjectInputStream(is);
		List<UserVO> list = (List<UserVO>) ois.readObject();
		ois.close();

		return list;
	}
	
}
