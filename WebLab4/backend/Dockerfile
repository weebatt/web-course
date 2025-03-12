FROM tomcat:9-jdk11

WORKDIR /usr/local/tomcat/webapps/

COPY build/libs/*.war ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]
