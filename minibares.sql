-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: apiminibares
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

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
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `nombreContacto` varchar(45) DEFAULT NULL,
  `razonSocial` varchar(45) DEFAULT NULL,
  `cifnif` varchar(45) DEFAULT NULL,
  `imagen` blob DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `tipoCifNif` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Empresa A','A','3','Pedro Sanchez','M','DNI','','2023-02-05 11:22:17','2023-01-24 17:42:15',NULL),(2,'Empresa B','B','3','Pedro Sanchez','S','Pasaporte',_binary 'imagenes/sinimagen.jpg','2023-02-28 16:52:28','2023-01-24 17:42:15',NULL);
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitaciones`
--

DROP TABLE IF EXISTS `habitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hotelId` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `imagen` blob DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`hotelId`),
  KEY `fk_hab_hot` (`hotelId`),
  CONSTRAINT `fk_hab_hot` FOREIGN KEY (`hotelId`) REFERENCES `hoteles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitaciones`
--

LOCK TABLES `habitaciones` WRITE;
/*!40000 ALTER TABLE `habitaciones` DISABLE KEYS */;
INSERT INTO `habitaciones` VALUES (1,1,'101',_binary 'imagenes/63fe2536e4927.jpeg',NULL,'2023-01-28 17:40:04'),(2,1,'102',_binary 'imagenes/63fe31609e8c8.jpeg','2023-01-28 17:40:04','2023-01-28 17:40:04'),(3,5,'101',NULL,NULL,'2023-01-28 17:40:04'),(4,5,'102',NULL,NULL,'2023-01-28 17:40:04'),(5,1,'201',NULL,NULL,NULL),(6,1,'202',NULL,NULL,NULL),(7,1,'203',NULL,NULL,NULL),(8,1,'204',NULL,NULL,NULL),(9,1,'205',NULL,NULL,NULL),(10,8,'111',NULL,NULL,NULL);
/*!40000 ALTER TABLE `habitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoteles`
--

DROP TABLE IF EXISTS `hoteles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoteles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresaId` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `telefonoContacto` varchar(45) DEFAULT NULL,
  `personaContacto` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`empresaId`),
  KEY `fk_hot_emp` (`empresaId`),
  CONSTRAINT `fk_hot_emp` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoteles`
--

LOCK TABLES `hoteles` WRITE;
/*!40000 ALTER TABLE `hoteles` DISABLE KEYS */;
INSERT INTO `hoteles` VALUES (1,1,'Hotel A','C/','4','Pedro Sanchez','imagenes/63f8fe036b3eb.jpeg','2023-01-28 17:33:41','2023-01-28 17:33:41'),(5,1,'Hotel B','C/','4','Pedro Sanchez','imagenes/63fc885999736.png','2023-02-04 10:49:17','2023-02-04 10:49:17'),(6,1,'Hotel C','C/','4','Pedro Sanchez','imagenes/63fc88622dcc5.jpeg','2023-02-04 10:59:45','2023-02-04 10:59:45'),(7,1,'Hotel D','C/S','4','Pedro Sanchezs','imagenes/63f8fd926a691.jpeg','2023-02-04 10:59:56','2023-02-04 10:59:56'),(8,2,'W','X',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `hoteles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventarios`
--

DROP TABLE IF EXISTS `inventarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hotelId` int(11) NOT NULL,
  `productoId` int(11) NOT NULL,
  `usuario_posteo_id` int(11) DEFAULT NULL,
  `fechaCaducidad` date DEFAULT NULL,
  `situacion` varchar(1) DEFAULT NULL COMMENT '(H)abitación o (A)lmacén',
  `habitacionId` int(11) DEFAULT NULL COMMENT 'Si no tiene número de habitación está en el inventario/almacen del hotel',
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `posteoSN` varchar(1) DEFAULT NULL,
  `fecha_posteo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`hotelId`,`productoId`),
  KEY `fk_inv_pro` (`productoId`),
  KEY `fk_inv_hot_idx` (`hotelId`),
  CONSTRAINT `fk_inv_hot` FOREIGN KEY (`hotelId`) REFERENCES `hoteles` (`id`),
  CONSTRAINT `fk_inv_pro` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventarios`
--

LOCK TABLES `inventarios` WRITE;
/*!40000 ALTER TABLE `inventarios` DISABLE KEYS */;
INSERT INTO `inventarios` VALUES (1,1,1,NULL,'2023-03-05','A',1,NULL,NULL,NULL,NULL),(2,1,2,NULL,'2023-03-05','A',1,NULL,NULL,NULL,NULL),(3,1,3,NULL,'2023-03-05','A',1,NULL,NULL,NULL,NULL),(4,1,3,NULL,'2023-03-05','A',2,NULL,NULL,NULL,NULL),(5,1,3,NULL,'2023-03-05','A',2,NULL,NULL,NULL,NULL),(6,1,4,1,'2023-05-07','V',2,NULL,NULL,NULL,'2023-03-10'),(7,1,4,NULL,'2023-05-08','A',3,NULL,NULL,NULL,NULL),(8,1,4,NULL,'2023-05-08','A',3,NULL,NULL,NULL,NULL),(9,1,4,NULL,'2023-05-08','A',3,NULL,NULL,NULL,NULL),(11,1,3,NULL,'2023-03-05','A',1,NULL,NULL,NULL,NULL),(12,1,4,NULL,'2023-05-08','A',1,NULL,NULL,NULL,NULL),(13,1,1,NULL,'2023-03-05','A',2,NULL,NULL,NULL,NULL),(14,1,2,NULL,'2023-03-05','A',2,NULL,NULL,NULL,NULL),(15,1,3,NULL,'2023-03-05','A',2,NULL,NULL,NULL,NULL),(16,1,4,NULL,'2023-05-08','A',2,NULL,NULL,NULL,NULL),(17,1,1,NULL,'2023-03-05','H',1,NULL,NULL,NULL,NULL),(18,1,2,NULL,'2023-03-05','H',1,NULL,NULL,NULL,NULL),(19,1,3,NULL,'2023-03-05','H',1,NULL,NULL,NULL,NULL),(20,1,4,NULL,'2023-03-05','H',1,NULL,NULL,NULL,NULL),(21,1,1,NULL,'2023-03-05','H',2,NULL,NULL,NULL,NULL),(22,1,2,NULL,'2023-03-05','H',2,NULL,NULL,NULL,NULL),(23,1,3,NULL,'2023-03-05','H',2,NULL,NULL,NULL,NULL),(24,1,4,NULL,'2023-03-05','H',2,NULL,NULL,NULL,NULL),(25,1,1,1,'2023-03-05','V',3,NULL,NULL,NULL,'2023-03-10'),(26,1,2,NULL,'2023-03-05','H',3,NULL,NULL,NULL,NULL),(27,1,3,NULL,'2023-03-05','H',3,NULL,NULL,NULL,NULL),(28,1,1,1,'2023-03-05','V',2,NULL,NULL,NULL,'2023-03-10'),(29,1,1,1,'2023-03-05','V',2,NULL,NULL,NULL,'2023-03-10'),(30,1,1,1,'2023-03-05','V',2,NULL,NULL,NULL,'2023-03-10'),(31,1,1,1,'2023-03-05','V',1,NULL,NULL,NULL,'2023-03-10'),(31,1,2,1,'2023-03-05','V',1,NULL,NULL,NULL,'2023-03-10'),(33,1,3,1,'2023-03-05','V',1,NULL,NULL,NULL,'2023-03-10'),(34,8,3,1,'2023-03-05','V',10,NULL,NULL,NULL,'2023-03-10'),(35,8,1,1,'2023-03-05','V',10,NULL,NULL,NULL,'2023-03-10'),(36,8,2,1,'2023-03-05','V',10,NULL,NULL,NULL,'2023-03-10');
/*!40000 ALTER TABLE `inventarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_not_founds`
--

DROP TABLE IF EXISTS `log_not_founds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_not_founds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaCreacion` datetime DEFAULT NULL,
  `usuarioId` varchar(45) DEFAULT NULL,
  `usuarioNombre` varchar(45) DEFAULT NULL,
  `usuarioRolesId` varchar(45) DEFAULT NULL,
  `nombreEmpresa` varchar(45) DEFAULT NULL,
  `controlador` varchar(45) DEFAULT NULL,
  `accion` varchar(45) DEFAULT NULL,
  `codigoError` varchar(250) DEFAULT NULL,
  `mensage` varchar(250) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_not_founds`
--

LOCK TABLES `log_not_founds` WRITE;
/*!40000 ALTER TABLE `log_not_founds` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_not_founds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaCreacion` datetime DEFAULT NULL,
  `mensage` mediumtext DEFAULT NULL,
  `proceso` varchar(255) DEFAULT NULL,
  `accion` varchar(255) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2023_01_20_191145_create_blogs_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posteos`
--

DROP TABLE IF EXISTS `posteos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posteos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inventarioId` int(11) NOT NULL,
  `tipoId` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`inventarioId`,`tipoId`),
  KEY `fk_pos_inv` (`inventarioId`),
  KEY `fk_pos_tip` (`tipoId`),
  CONSTRAINT `fk_pos_inv` FOREIGN KEY (`inventarioId`) REFERENCES `inventarios` (`id`),
  CONSTRAINT `fk_pos_tip` FOREIGN KEY (`tipoId`) REFERENCES `tipos_posteos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posteos`
--

LOCK TABLES `posteos` WRITE;
/*!40000 ALTER TABLE `posteos` DISABLE KEYS */;
/*!40000 ALTER TABLE `posteos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `imagen` blob DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'cocacola','cocacola',_binary 'imagenes/63ff78b378772.jpeg','2023-03-01 16:09:23',NULL),(2,'fanta','fanta',_binary 'imagenes/63ff78c57634a.jpeg','2023-03-01 16:09:41',NULL),(3,'agua','agua',_binary 'imagenes/63ff78d1291c5.jpeg','2023-03-01 16:09:53',NULL),(4,'Pistachos','pistachos',_binary 'imagenes/63ff78d7f415d.jpeg','2023-03-01 16:10:00',NULL),(7,'Wooper','w',_binary 'imagenes/640c9ff7676c7.jpeg','2023-03-11 15:36:23','2023-03-11 15:36:23');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_defecto`
--

DROP TABLE IF EXISTS `productos_defecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_defecto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hotelId` int(11) NOT NULL,
  `productoId` int(11) NOT NULL,
  `importe` int(11) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`hotelId`,`productoId`),
  KEY `fk_pro_hot_idx` (`hotelId`),
  KEY `fk_prod_pro_idx` (`productoId`),
  CONSTRAINT `fk_prod_hot` FOREIGN KEY (`hotelId`) REFERENCES `hoteles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prod_pro` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_defecto`
--

LOCK TABLES `productos_defecto` WRITE;
/*!40000 ALTER TABLE `productos_defecto` DISABLE KEYS */;
INSERT INTO `productos_defecto` VALUES (14,1,1,1,'2023-02-18 17:00:41','2023-02-18 17:00:41'),(16,1,2,1,'2023-03-01 15:53:57','2023-03-01 15:53:57'),(18,5,1,1,'2023-03-01 15:54:22','2023-03-01 15:54:22'),(19,1,7,NULL,'2023-03-11 15:37:05','2023-03-11 15:37:05'),(20,1,3,NULL,'2023-03-14 20:31:59','2023-03-14 20:31:59');
/*!40000 ALTER TABLE `productos_defecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_passwords`
--

DROP TABLE IF EXISTS `reset_passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reset_passwords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`userId`),
  KEY `fk_res_usr_idx` (`userId`),
  CONSTRAINT `fk_res_usr` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_passwords`
--

LOCK TABLES `reset_passwords` WRITE;
/*!40000 ALTER TABLE `reset_passwords` DISABLE KEYS */;
/*!40000 ALTER TABLE `reset_passwords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_permisos`
--

DROP TABLE IF EXISTS `roles_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_permisos` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL,
  `controlador` varchar(50) DEFAULT NULL,
  `accion` varchar(50) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`roleId`),
  KEY `fk_rop_rol` (`roleId`),
  CONSTRAINT `fk_rop_rol` FOREIGN KEY (`roleId`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_permisos`
--

LOCK TABLES `roles_permisos` WRITE;
/*!40000 ALTER TABLE `roles_permisos` DISABLE KEYS */;
INSERT INTO `roles_permisos` VALUES (1,1,'Empresas','ver','',''),(2,1,'Empresas','editar','',''),(3,1,'Empresas','crear','',''),(4,1,'Empresas','borrar','',''),(35,1,'Panel','ver','2023-02-02 21:20:43','2023-02-02 21:20:43'),(36,1,'Panel','editar','2023-02-02 21:20:43','2023-02-02 21:20:43'),(37,1,'Panel','crear','2023-02-02 21:20:44','2023-02-02 21:20:44'),(38,1,'Panel','borrar','2023-02-02 21:20:45','2023-02-02 21:20:45'),(39,1,'Hoteles','ver','2023-02-02 21:20:46','2023-02-02 21:20:46'),(40,1,'Hoteles','editar','2023-02-02 21:20:46','2023-02-02 21:20:46'),(41,1,'Hoteles','crear','2023-02-02 21:20:47','2023-02-02 21:20:47'),(42,1,'Hoteles','borrar','2023-02-02 21:20:47','2023-02-02 21:20:47'),(43,1,'Habitaciones','ver','2023-02-02 21:20:47','2023-02-02 21:20:47'),(44,1,'Habitaciones','editar','2023-02-02 21:20:48','2023-02-02 21:20:48'),(45,1,'Habitaciones','crear','2023-02-02 21:20:49','2023-02-02 21:20:49'),(46,1,'Habitaciones','borrar','2023-02-02 21:20:49','2023-02-02 21:20:49'),(47,1,'Inventario','ver','2023-02-02 21:20:51','2023-02-02 21:20:51'),(48,1,'Inventario','editar','2023-02-02 21:20:52','2023-02-02 21:20:52'),(49,1,'Inventario','crear','2023-02-02 21:20:52','2023-02-02 21:20:52'),(50,1,'Inventario','borrar','2023-02-02 21:20:53','2023-02-02 21:20:53'),(51,1,'Productos','borrar','2023-02-02 21:20:53','2023-02-02 21:20:53'),(52,1,'Productos','crear','2023-02-02 21:20:54','2023-02-02 21:20:54'),(53,1,'Productos','editar','2023-02-02 21:20:55','2023-02-02 21:20:55'),(54,1,'Productos','ver','2023-02-02 21:20:55','2023-02-02 21:20:55'),(55,1,'Posteos','ver','2023-02-02 21:20:56','2023-02-02 21:20:56'),(56,1,'Posteos','editar','2023-02-02 21:20:56','2023-02-02 21:20:56'),(57,1,'Posteos','crear','2023-02-02 21:20:57','2023-02-02 21:20:57'),(58,1,'Posteos','borrar','2023-02-02 21:20:57','2023-02-02 21:20:57'),(59,1,'Sistema','borrar','2023-02-02 21:20:58','2023-02-02 21:20:58'),(60,1,'Sistema','crear','2023-02-02 21:20:58','2023-02-02 21:20:58'),(61,1,'Sistema','editar','2023-02-02 21:20:59','2023-02-02 21:20:59'),(62,1,'Sistema','ver','2023-02-02 21:20:59','2023-02-02 21:20:59'),(67,2,'Panel','ver','2023-02-03 15:42:45','2023-02-03 15:42:45'),(68,1,'Usuarios','ver','2023-02-05 18:09:49','2023-02-05 18:09:49'),(69,1,'Usuarios','crear','2023-02-05 18:09:50','2023-02-05 18:09:50'),(70,1,'Usuarios','editar','2023-02-05 18:09:50','2023-02-05 18:09:50'),(71,1,'Usuarios','borrar','2023-02-05 18:09:51','2023-02-05 18:09:51'),(72,2,'Usuarios','ver','2023-02-05 18:09:51','2023-02-05 18:09:51'),(73,1,'Informes','ver','2023-02-18 13:57:43','2023-02-18 13:57:43'),(74,1,'Informes','crear','2023-02-18 13:57:43','2023-02-18 13:57:43'),(75,1,'Informes','editar','2023-02-18 13:57:43','2023-02-18 13:57:43'),(76,1,'Informes','borrar','2023-02-18 13:57:44','2023-02-18 13:57:44'),(77,1,'Roles','ver','2023-02-27 12:31:13','2023-02-27 12:31:13'),(78,1,'Roles','crear','2023-02-27 12:31:13','2023-02-27 12:31:13'),(79,1,'Roles','editar','2023-02-27 12:31:14','2023-02-27 12:31:14'),(80,1,'Roles','borrar','2023-02-27 12:31:14','2023-02-27 12:31:14');
/*!40000 ALTER TABLE `roles_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) DEFAULT NULL,
  `activoSN` char(1) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'Admin','S',NULL,NULL),(2,'Limpiador','S',NULL,NULL);
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `success_logins`
--

DROP TABLE IF EXISTS `success_logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `success_logins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `usuarioNombre` varchar(45) DEFAULT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`userId`),
  KEY `fk_suc_user_idx` (`userId`),
  CONSTRAINT `fk_suc_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `success_logins`
--

LOCK TABLES `success_logins` WRITE;
/*!40000 ALTER TABLE `success_logins` DISABLE KEYS */;
/*!40000 ALTER TABLE `success_logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_posteos`
--

DROP TABLE IF EXISTS `tipos_posteos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_posteos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `facturaSN` varchar(1) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_posteos`
--

LOCK TABLES `tipos_posteos` WRITE;
/*!40000 ALTER TABLE `tipos_posteos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipos_posteos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rolesId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `activoSN` varchar(1) DEFAULT 'S',
  `hash` varchar(70) DEFAULT NULL,
  `usuarioInactivo` varchar(45) DEFAULT NULL,
  `fechaInactivo` datetime DEFAULT NULL,
  `enviomailSN` varchar(1) DEFAULT NULL,
  `tmpPassword` varchar(60) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `empresaId` int(11) NOT NULL,
  PRIMARY KEY (`id`,`rolesId`,`empresaId`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `fk_rol_user_idx` (`rolesId`),
  KEY `fk_emp_user_idx` (`empresaId`),
  CONSTRAINT `fk_emp_user` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`),
  CONSTRAINT `fk_rol_user` FOREIGN KEY (`rolesId`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,2,'Arnau','ar@gmail.com',NULL,'$2y$10$zvfVkFu5Q.3DePyCTiUppulzhqNYubvdEcxlX3osyh2.7s5HQWq26',NULL,'2023-02-03 13:15:40','2023-02-28 16:00:05','S',NULL,'N',NULL,'S',NULL,'9','imagenes/63fe331596f25.jpeg',1),(6,1,'Martí','martisanchis2000@gmail.com',NULL,'$2y$10$zvfVkFu5Q.3DePyCTiUppulzhqNYubvdEcxlX3osyh2.7s5HQWq26',NULL,'2023-02-03 13:15:40','2023-02-19 10:08:49','S',NULL,'N',NULL,'S',NULL,'9','imagenes/63f2034146b09.jpeg',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_hoteles`
--

DROP TABLE IF EXISTS `usuarios_hoteles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_hoteles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `hotelId` int(11) NOT NULL,
  `hotel_defecto_sn` varchar(1) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `hotelNombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`userId`,`hotelId`),
  KEY `fk_use_hot` (`hotelId`),
  KEY `fk_use_usr` (`userId`),
  CONSTRAINT `fk_hot_usu` FOREIGN KEY (`hotelId`) REFERENCES `hoteles` (`id`),
  CONSTRAINT `fk_users_usu` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_hoteles`
--

LOCK TABLES `usuarios_hoteles` WRITE;
/*!40000 ALTER TABLE `usuarios_hoteles` DISABLE KEYS */;
INSERT INTO `usuarios_hoteles` VALUES (55,6,1,'S','2023-02-19 11:08:49','2023-02-19 11:08:49',NULL),(56,6,5,'N','2023-02-19 11:08:49','2023-02-19 11:08:49',NULL),(57,6,6,'N','2023-02-19 11:08:49','2023-02-19 11:08:49',NULL),(58,6,7,'N','2023-02-19 11:08:49','2023-02-19 11:08:49',NULL);
/*!40000 ALTER TABLE `usuarios_hoteles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'apiminibares'
--

--
-- Dumping routines for database 'apiminibares'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06 17:39:12
