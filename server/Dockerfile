# Stage 1: Build the application
FROM maven:latest AS builder

# Copy the pom.xml to install dependencies
COPY . .

# Install dependencies (including any project-specific dependencies)
RUN mvn clean package -DskipTests 

# Stage 2: Build the runtime image
FROM openjdk:21-jdk-slim

# Copy the JAR file from the build stage
COPY --from=builder /target/creditflow-0.0.1-SNAPSHOT.jar app.jar

# Set environment variables (you can optionally include default values for debugging)
# These should be overridden by Render's environment variables at runtime
ENV DB_URL=${DB_URL}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_NAME=${DB_NAME}

# Expose the port that the app will run on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
