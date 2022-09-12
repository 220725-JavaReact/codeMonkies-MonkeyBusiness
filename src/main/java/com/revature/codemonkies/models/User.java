package com.revature.codemonkies.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User {

	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column(name="user_username")
	private String userName;
	@Column(name="user_password")
	private String password;
	@Column(name="user_bananas")
	private int bananas;
	
	public User() {
		super();
	}
	
	public User(String userName, String password, int bananas) {
		super();
		this.userName = userName;
		this.password = password;
		this.bananas = bananas;
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getBananas() {
		return bananas;
	}
	public void setBananas(int bananas) {
		this.bananas = bananas;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", bananas=" + bananas + "]";
	}
	
	
	
}
