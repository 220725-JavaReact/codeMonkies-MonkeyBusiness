package com.revature.codemonkies.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.codemonkies.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{ //model and pk type
	
	public User findByUserName(String userName);
	public <S extends User> S save(User user);
}
