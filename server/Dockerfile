# Stage 1: Build the application
FROM maven:3.8.4-openjdk-21-slim AS builder

# Set the working directory for the build
WORKDIR /build

# Copy the pom.xml to install dependencies
COPY pom.xml /build/

# Install dependencies (including any project-specific dependencies)
RUN mvn clean install

# Copy the source code
COPY src /build/src/

# Package the application
RUN mvn package

# Stage 2: Build the runtime image
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=builder /build/target/creditflow-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that the app will run on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
