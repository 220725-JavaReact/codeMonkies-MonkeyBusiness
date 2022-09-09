package com.revature.codemonkies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Driver {

	public static void main(String[] args) {
		SpringApplication.run(Driver.class, args);
	}

}
