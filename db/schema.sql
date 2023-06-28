DROP DATABASE IF EXISTS deparments_db;
CREATE DATABASE deparments_db;

USE deparments_db;

CREATE TABLE department{
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  names VARCHAR(30) NOT NULL
}

CREATE TABLE roles{
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT
}

CREATE TABLE employee{
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
}