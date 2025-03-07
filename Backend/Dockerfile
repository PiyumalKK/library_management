# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the application JAR file
COPY target/*.jar app.jar

# Expose the application port
EXPOSE 9090

# Set environment variables for MySQL
ENV SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/MyLibrary \
    SPRING_DATASOURCE_USERNAME=root \
    SPRING_DATASOURCE_PASSWORD=foreverSmile \
    SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver \
    SPRING_JPA_HIBERNATE_DDL_AUTO=update \
    SPRING_JPA_SHOW_SQL=true

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
