package com.revature.codemonkies.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.codemonkies.models.User;
import com.revature.codemonkies.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	private UserService userService;
	
	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@PostMapping(value="/new", consumes = MediaType.APPLICATION_JSON_VALUE)
	public void save(@RequestBody User user) {
		this.userService.save(user);
		System.out.println(user.toString());
	}
}
