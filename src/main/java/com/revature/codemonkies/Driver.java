package com.revature.codemonkies;

import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Driver {

	public static void main(String[] args) {
		SpringApplication.run(Driver.class, args);
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				// addMapping is for umbrella URLS
				// allowed origins is frontend url
				// For all our endpoints API side, respond to requests sent localhost:3000
				registry.addMapping("/**").allowedOrigins("http://localhost:3000", "http://localhost:3001");
				//
			}
		};
	}

}
