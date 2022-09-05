-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: todo-app
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_name` varchar(100) NOT NULL,
  `task_date` date NOT NULL,
  `task_time` time NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (127,'task one planned edit','2022-06-20','09:00:00',65),(128,'task two tasks edit','2022-06-14','09:30:00',65),(129,'task three edit imprtant','2022-06-29','09:00:00',65),(131,'task overdue 1 tasks edit ','2022-06-12','09:31:00',65),(132,'task overdue 2','2022-06-15','06:45:00',65),(133,'task tomorrow 1','2022-06-28','07:51:00',65),(134,'task tomorrow 2','2022-06-28','05:30:00',65),(135,'task next week 1 test edit planned this week','2022-07-04','08:30:00',65),(136,'task harini 1','2022-06-27','06:00:00',66),(137,'task harini 2','2022-06-27','06:45:00',66),(138,'task harini 3','2022-06-27','07:45:00',66),(139,'task harini 4','2022-06-27','05:45:00',66),(140,'today task 6','2022-06-27','09:30:00',65),(141,'test task harini 1','2022-06-29','02:31:00',65),(142,'task one planned edit','2022-06-20','09:00:00',65);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks_type`
--

DROP TABLE IF EXISTS `tasks_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_important` int DEFAULT '0',
  `is_completed` int DEFAULT '0',
  `task_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks_type`
--

LOCK TABLES `tasks_type` WRITE;
/*!40000 ALTER TABLE `tasks_type` DISABLE KEYS */;
INSERT INTO `tasks_type` VALUES (120,1,1,127,65),(121,NULL,NULL,128,65),(122,1,NULL,129,65),(124,1,1,131,65),(125,1,1,132,65),(126,1,1,133,65),(127,NULL,1,134,65),(128,1,NULL,135,65),(129,1,NULL,136,66),(130,NULL,1,137,66),(131,NULL,NULL,138,66),(132,NULL,1,139,66),(133,NULL,NULL,140,65),(134,NULL,NULL,141,65),(135,NULL,NULL,142,65);
/*!40000 ALTER TABLE `tasks_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `password` binary(60) NOT NULL,
  `login_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (65,'Muhammad Aslam Hamdi','Amran','Wokle','wokle08@gmail.com',_binary '$2b$10$2DSkdBHFBOG5SaASyuc7Eebe8igil3Z81Nw6bO3qUWZZ/MwvZYjNS','local'),(66,'Muhammad Aslam Hamdi','Amran','Aslam Amran','aslamhamdi.ah08@gmail.com',_binary '$2b$10$goe1Re4pGfLHeG.TVZoxXOmTnbLqINUXPGOPizlyhA8E9PaliAHxW','local');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'todo-app'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_task` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_task`(
	IN type int(255),
	IN taskName varchar(255),
    IN taskDate date,
    IN taskTime time,
    IN userId int(255),
    IN taskId int(255),
	IN isImportant int(255),
    IN isCompleted int(255),
    IN startDate date,
    IN endDate date,
	INOUT taskId2 int(255)
)
BEGIN
	IF type = 1 THEN -- select all today's tasks
		SELECT a.id as TaskId, a.task_name as TaskName, a.task_date as TaskDate, a.task_time as TaskTime, b.is_important as IsImportant, b.is_completed as IsCompleted, a.user_id as UserId 
		FROM tasks a 
		LEFT JOIN tasks_type b 
		ON a.id = b.task_id
		where a.user_id = userId and a.task_date  = cast(curdate() as date);
        
	ELSEIF type = 2 THEN -- insert new task
		INSERT INTO tasks( -- insert into tasks table
			task_name, task_date, task_time, user_id
		)
		VALUES(
			taskName, taskDate, taskTime, userId
        );
		SELECT id FROM tasks ORDER BY id DESC LIMIT 1 INTO taskId2;
        INSERT INTO tasks_type( -- insert into tasks_type table
			is_important, is_completed, task_id, user_id
		)
		VALUES(
			isImportant, isCompleted, taskId2, userId
        );
        
	ELSEIF type = 3 THEN -- delete task
		DELETE FROM tasks WHERE id = taskId and user_id = userId;
        DELETE FROM tasks_type WHERE task_id = taskId and user_id = userId;
        
	ELSEIF type = 4 THEN -- set or remove task as important
		UPDATE tasks_type set is_important = isImportant where task_id = taskId and user_id = userId;
        
	ELSEIF type = 5 THEN -- set or remove task as important
		UPDATE tasks_type set is_completed = isCompleted where task_id = taskId and user_id = userId;
        
	ELSEIF type = 6 THEN -- get all important tasks
		SELECT a.id as TaskId, a.task_name as TaskName, a.task_date as TaskDate, a.task_time as TaskTime, b.is_important as IsImportant, b.is_completed as IsCompleted, a.user_id as UserId 
		FROM tasks a 
		LEFT JOIN tasks_type b 
		ON a.id = b.task_id
		where a.user_id = userId and b.is_important = 1 and b.is_completed is null;
	
	ELSEIF type = 7 THEN -- select all tasks
		SELECT a.id as TaskId, a.task_name as TaskName, a.task_date as TaskDate, a.task_time as TaskTime, b.is_important as IsImportant, b.is_completed as IsCompleted, a.user_id as UserId 
		FROM tasks a 
		LEFT JOIN tasks_type b 
		ON a.id = b.task_id
		where a.user_id = userId ;
        
	ELSEIF type = 8 THEN -- select all overdue tasks
		SELECT a.id as TaskId, a.task_name as TaskName, a.task_date as TaskDate, a.task_time as TaskTime, b.is_important as IsImportant, b.is_completed as IsCompleted, a.user_id as UserId 
		FROM tasks a 
		LEFT JOIN tasks_type b 
		ON a.id = b.task_id
		where a.user_id = userId and a.task_date < cast(curdate() as date);
        
	ELSEIF type = 9 THEN -- select all tomorrow tasks
		SELECT a.id as TaskId, a.task_name as TaskName, a.task_date as TaskDate, a.task_time as TaskTime, b.is_important as IsImportant, b.is_completed as IsCompleted, a.user_id as UserId 
		FROM tasks a 
		LEFT JOIN tasks_type b 
		ON a.id = b.task_id
		where a.user_id = userId and a.task_date = cast(curdate() + 1 as date);
        
	ELSEIF type = 10 THEN -- select this week tasks
		SELECT a.id as TaskId, a.task_name as TaskName, a.task_date as TaskDate, a.task_time as TaskTime, b.is_important as IsImportant, b.is_completed as IsCompleted, a.user_id as UserId 
		FROM tasks a 
		LEFT JOIN tasks_type b 
		ON a.id = b.task_id
		where a.user_id = userId and a.task_date between startDate and endDate;
        
	ELSEIF type = 11 THEN -- select all planned tasks
		SELECT a.id as TaskId, a.task_name as TaskName, a.task_date as TaskDate, a.task_time as TaskTime, b.is_important as IsImportant, b.is_completed as IsCompleted, a.user_id as UserId 
		FROM tasks a 
		LEFT JOIN tasks_type b 
		ON a.id = b.task_id
		where a.user_id = userId and a.task_date > cast(curdate() as date);
        
	ELSEIF type = 12 THEN -- edit
		UPDATE tasks SET task_name = taskName WHERE id = taskId;
        UPDATE tasks SET task_date = taskDate WHERE id = taskId;
        UPDATE tasks SET task_time = taskTime WHERE id = taskId;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user`(
	IN type int(255),
    IN firstName varchar(255),
    IN lastName varchar(255),
    IN userName varchar(255),
	IN emailAddress varchar(255),
    IN pass_word binary(60),
    IN loginType varchar(255),
    IN userId varchar(255)
)
BEGIN
	IF type = 1 THEN -- register user
		INSERT INTO users (first_name, last_name, user_name, email_address, password, login_type)
        VALUES
        (firstName, lastName, userName, emailAddress, pass_word, loginType);
	ELSEIF type = 2 THEN -- Get user by email
		SELECT * FROM users where email_address = emailAddress; 
	ELSEIF type = 3 THEN -- Get user by id
		SELECT * FROM users where id = userId; 
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-05 23:07:43
