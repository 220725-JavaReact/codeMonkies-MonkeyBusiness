package com.revature.codemonkies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.codemonkies.models.User;
import com.revature.codemonkies.repos.UserRepository;

@Service("userService")
public class UserService{

	private UserRepository userRepository;

	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public User findByUserName(String userName) {
		return this.userRepository.findByUserName(userName);
	}
	
	public void save(User user) {
		this.userRepository.save(user);
	}

}
