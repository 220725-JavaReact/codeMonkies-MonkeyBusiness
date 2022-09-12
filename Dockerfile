
FROM tomcat:8.5-jre8

copy /target/codeMonkies-MonkeyBusiness.war /usr/local/tomcat/webapps

expose 8080

CMD ["catalina.sh", "run"]