FROM openjdk:21-jdk-slim
WORKDIR /app
COPY pom.xml /app/
RUN mvn clean install
COPY .env /app/.env
COPY target/creditflow-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
