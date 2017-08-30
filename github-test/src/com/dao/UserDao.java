package com.dao;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.pojo.UserVO;

@Component
public class UserDao {

	public void createUserInfo(List<UserVO> list, String userdb) throws IOException {

		File file = new File(userdb);
		FileOutputStream os = new FileOutputStream(file);
		ObjectOutputStream oos = new ObjectOutputStream(os);
		oos.writeObject(list);
		oos.close();

	}

	@SuppressWarnings("unchecked")
	public List<UserVO> findUserInfo(String userdb) throws IOException {
		List<UserVO> list = new ArrayList<UserVO>();
		ObjectInputStream ois = null;
		try {
			FileInputStream is = new FileInputStream(userdb);
			ois = new ObjectInputStream(is);
			list = (List<UserVO>) ois.readObject();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			ois.close();
		}
		return list;
	}
}
