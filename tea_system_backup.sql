-- MySQL dump 10.13  Distrib 9.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: tea_system
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Addresses`
--

DROP TABLE IF EXISTS `Addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `recipient` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `isDefault` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Addresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Addresses`
--

LOCK TABLES `Addresses` WRITE;
/*!40000 ALTER TABLE `Addresses` DISABLE KEYS */;
INSERT INTO `Addresses` VALUES (1,20,'高師大','吳傢澂','1234567890','高雄市','燕巢區','824高雄市燕巢區深水里深中路62號',0,'2025-05-03 12:23:11','2025-05-03 19:45:17'),(2,20,'高師大和平','吳傢澂','1234567890','高雄市','苓雅區','80201高雄市苓雅區和平一路116號',1,'2025-05-03 19:45:17','2025-05-03 19:45:17');
/*!40000 ALTER TABLE `Addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderItems`
--

DROP TABLE IF EXISTS `OrderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `productName` varchar(255) NOT NULL COMMENT '商品名稱 (冗餘儲存以防商品後續變更)',
  `productImage` varchar(255) DEFAULT NULL COMMENT '商品圖片 (冗餘儲存)',
  `size` enum('M','L') NOT NULL COMMENT '尺寸: 中杯/大杯',
  `sugar` varchar(255) NOT NULL COMMENT '糖度',
  `ice` varchar(255) NOT NULL COMMENT '冰塊',
  `toppings` json DEFAULT NULL COMMENT '加料選項',
  `quantity` int NOT NULL DEFAULT '1',
  `unitPrice` decimal(10,2) NOT NULL COMMENT '單價',
  `subTotal` decimal(10,2) NOT NULL COMMENT '小計金額',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `OrderItems_ibfk_65` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `OrderItems_ibfk_66` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderItems`
--

LOCK TABLES `OrderItems` WRITE;
/*!40000 ALTER TABLE `OrderItems` DISABLE KEYS */;
INSERT INTO `OrderItems` VALUES (1,1,1,'粉粿厚奶茶','/assets/Recommend-1.jpg','M','無糖','去冰','[]',1,55.00,55.00,'2025-05-03 17:19:02','2025-05-03 17:19:02'),(2,1,11,'烏龍翠綠','/assets/products/classic/classic-6.webp','M','無糖','正常冰','[\"椰果\"]',1,29.00,29.00,'2025-05-03 17:19:02','2025-05-03 17:19:02'),(3,1,8,'爽爽摸綠茶','/assets/products/classic/classic-3.webp','M','無糖','熱飲','[\"椰果\", \"波霸\", \"珍珠\"]',1,49.00,49.00,'2025-05-03 17:19:02','2025-05-03 17:19:02'),(4,2,6,'摸摸紅茶','/assets/products/classic/classic-1.webp','L','正常糖','少冰','[\"波霸\", \"椰果\"]',2,45.00,90.00,'2025-05-03 17:33:03','2025-05-03 17:33:03'),(5,2,12,'愛荔殺殺','/assets/products/special/special-1.jpg','L','無糖','少冰','[]',3,78.00,234.00,'2025-05-03 17:33:03','2025-05-03 17:33:03'),(10,5,6,'摸摸紅茶','/assets/products/classic/classic-1.webp','M','無糖','去冰','[]',1,19.00,19.00,'2025-05-05 14:27:23','2025-05-05 14:27:23'),(11,6,1,'粉粿厚奶茶','/assets/products/recommend/Recommend-1.jpg','M','無糖','去冰','[\"粉粿\"]',2,65.00,130.00,'2025-06-09 12:01:49','2025-06-09 12:01:49'),(12,7,1,'粉粿厚奶茶','/assets/products/recommend/Recommend-1.jpg','L','半糖','少冰','[\"粉粿\", \"珍珠\", \"仙草凍\"]',4,95.00,380.00,'2025-06-09 12:17:56','2025-06-09 12:17:56'),(13,7,8,'爽爽摸綠茶','/assets/products/classic/classic-3.webp','M','無糖','去冰','[]',1,19.00,19.00,'2025-06-09 12:17:56','2025-06-09 12:17:56'),(14,8,6,'摸摸紅茶','/assets/products/classic/classic-1.webp','L','半糖','少冰','[\"椰果\", \"波霸\", \"珍珠\", \"粉條\"]',3,65.00,195.00,'2025-06-09 12:32:40','2025-06-09 12:32:40'),(15,8,8,'爽爽摸綠茶','/assets/products/classic/classic-3.webp','M','無糖','去冰','[]',1,19.00,19.00,'2025-06-09 12:32:40','2025-06-09 12:32:40');
/*!40000 ALTER TABLE `OrderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNumber` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `status` enum('待處理','處理中','已完成','已取消') NOT NULL DEFAULT '待處理',
  `paymentMethod` enum('現金','信用卡','行動支付') NOT NULL DEFAULT '現金',
  `deliveryMethod` enum('自取','外送') NOT NULL DEFAULT '自取',
  `storeId` int DEFAULT NULL COMMENT '自取門市ID',
  `storeName` varchar(255) DEFAULT NULL COMMENT '自取門市名稱',
  `addressId` int DEFAULT NULL COMMENT '外送地址ID',
  `deliveryAddress` text COMMENT '外送地址詳情',
  `couponCode` varchar(255) DEFAULT NULL COMMENT '使用的優惠券代碼',
  `discountAmount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '折扣金額',
  `notes` text COMMENT '訂單備註',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (1,'ORD-20250504-666',20,133.00,'待處理','現金','自取',1,'龍潭北龍店',NULL,NULL,NULL,0.00,'','2025-05-03 17:19:02','2025-05-03 17:19:02'),(2,'ORD-20250504-754',20,882.00,'待處理','現金','外送',NULL,NULL,1,NULL,NULL,0.00,'','2025-05-03 17:33:03','2025-05-03 17:33:03'),(5,'ORD-20250505-590',20,19.00,'已完成','現金','外送',NULL,NULL,2,NULL,NULL,0.00,'','2025-05-05 14:27:23','2025-05-21 07:13:59'),(6,'ORD-20250609-015',20,260.00,'已取消','現金','自取',2,'大溪老街店',NULL,NULL,NULL,0.00,'','2025-06-09 12:01:49','2025-06-09 12:03:52'),(7,'ORD-20250609-715',20,1539.00,'已取消','現金','外送',NULL,NULL,2,NULL,NULL,0.00,'test','2025-06-09 12:17:56','2025-06-09 12:19:52'),(8,'ORD-20250609-618',20,604.00,'已完成','現金','外送',NULL,NULL,2,NULL,NULL,0.00,'test','2025-06-09 12:32:40','2025-06-09 12:35:01');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `category` enum('recommended','classic','special','mix') NOT NULL,
  `priceM` int DEFAULT NULL COMMENT '中杯價格(單位:元)',
  `priceL` int DEFAULT NULL COMMENT '大杯價格(單位:元)',
  `image` varchar(255) DEFAULT NULL,
  `isAvailable` tinyint(1) DEFAULT '1',
  `sugarOptions` json DEFAULT NULL COMMENT '可選的糖度選項',
  `iceOptions` json DEFAULT NULL COMMENT '可選的冰塊選項',
  `toppings` json DEFAULT NULL COMMENT '可選的加料選項',
  `notes` text COMMENT '特殊備註，如：固定甜度等',
  `hotAvailable` tinyint(1) DEFAULT '0' COMMENT '是否提供熱飲',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'粉粿厚奶茶','香濃奶茶搭配Q彈粉粿，口感層次豐富','recommended',55,65,'/assets/products/recommend/Recommend-1.jpg',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"粉粿\", \"仙草凍\"]',NULL,1,'2025-05-03 15:37:09','2025-06-09 12:35:51'),(2,'檸檬黑糖粉粿','清新檸檬與黑糖粉粿的絕妙組合','recommended',NULL,60,'/assets/products/recommend/Recommend-2.jpg',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"粉粿\", \"椰果\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(3,'焙煎蕎麥粉粿','焙煎蕎麥茶與粉粿的完美搭配，微微咖啡因的健康選擇','recommended',50,60,'/assets/products/recommend/Recommend-3.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"粉粿\", \"椰果\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(4,'綠茶凍梅露','清爽綠茶搭配Q彈茶凍與酸甜梅子','recommended',NULL,50,'/assets/products/recommend/Recommend-4.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"茶凍\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(5,'中焙生乳紅茶','中焙紅茶搭配醇香生乳，口感滑順香醇','recommended',49,NULL,'/assets/products/recommend/Recommend-5.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[]','*甜度(正常/減糖) / 冰塊固定',0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(6,'摸摸紅茶','精選阿薩姆紅茶，茶香濃郁回甘','classic',19,25,'/assets/products/classic/classic-1.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"波霸\", \"椰果\", \"粉條\"]',NULL,1,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(7,'好摸冬瓜青','冬瓜糖與青茶的經典組合，清爽解渴','classic',19,25,'/assets/products/classic/classic-2.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"波霸\", \"椰果\", \"粉條\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(8,'爽爽摸綠茶','選用優質綠茶，口感清新爽口','classic',19,25,'/assets/products/classic/classic-3.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"波霸\", \"椰果\", \"粉條\"]',NULL,1,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(9,'焙煎蕎麥','烘焙蕎麥的香氣，微咖啡因健康選擇','classic',19,25,'/assets/products/classic/classic-4.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"波霸\", \"椰果\"]','*微咖啡因',1,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(10,'烏龍一場','精選高山烏龍，香氣回甘','classic',19,25,'/assets/products/classic/classic-5.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"波霸\", \"椰果\", \"粉條\"]',NULL,1,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(11,'烏龍翠綠','烏龍茶與綠茶的絕妙結合，層次豐富','classic',19,25,'/assets/products/classic/classic-6.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"波霸\", \"椰果\", \"粉條\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(12,'愛荔殺殺','薄荷、荔枝、紅茶茶湯和Q彈椰果的完美結合','special',NULL,78,'/assets/products/special/special-1.jpg',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"椰果\"]','*甜度固定 / 僅供冰飲',0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(13,'橙芝汗','新鮮柑橘與芝士奶蓋的絕配','special',NULL,87,'/assets/products/special/special-2.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[]','*甜度固定 / 僅供冰飲',0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(14,'中焙生乳紅茶','中焙紅茶搭配醇香生乳，口感滑順香醇','special',49,NULL,'/assets/products/recommend/Recommend-5.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[]','*甜度(正常/減糖) / 冰塊固定',0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(15,'超PINEAPPLE冰茶','新鮮鳳梨與清爽冰茶的完美結合','special',NULL,80,'/assets/products/special/special-4.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[]','*甜度冰塊固定',0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(16,'珍珠芝麻歐蕾','香濃芝麻奶與Q彈珍珠的絕佳組合','special',59,70,'/assets/products/special/special-5.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\"]','*可選固定冰/熱飲・甜度固定',1,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(17,'覓蜜紅茶','以蜂蜜調味的紅茶，香甜不膩口','mix',29,40,'/assets/products/mix/mix-1.jpg',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"椰果\", \"仙草凍\"]',NULL,1,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(18,'覓蜜綠茶','蜂蜜與綠茶的清新組合','mix',29,40,'/assets/products/mix/mix-2.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"椰果\", \"仙草凍\"]',NULL,1,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(19,'百香三寶','百香果風味搭配珍珠、椰果、茶凍三種配料','mix',NULL,55,'/assets/products/mix/mix-3.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"珍珠\", \"椰果\", \"茶凍\"]','珍珠/椰果/茶凍',0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(20,'綠茶凍梅露','清爽綠茶搭配Q彈茶凍與酸甜梅子','mix',NULL,50,'/assets/products/recommend/Recommend-4.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"茶凍\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(21,'甘蔗青茶','甘蔗汁與青茶的天然甜美組合','mix',49,60,'/assets/products/mix/mix-5.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"椰果\", \"粉條\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(22,'覓蜜檸檬蘆薈','清爽檸檬與蘆薈粒，搭配蜂蜜調味','mix',39,50,'/assets/products/mix/mix-6.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"蘆薈\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(23,'檸檬黑糖粉粿','清新檸檬與黑糖粉粿的絕妙組合','mix',NULL,60,'/assets/products/recommend/Recommend-2.jpg',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"粉粿\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(24,'金桔檸檬茶凍','金桔與檸檬的酸甜搭配Q彈茶凍','mix',NULL,65,'/assets/products/mix/mix-8.webp',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"茶凍\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(25,'檸檬養樂多','清新檸檬與乳酸菌飲品的健康組合','mix',NULL,60,'/assets/products/mix/mix-9.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(26,'養樂多綠茶','乳酸菌飲品與綠茶的清爽混搭','mix',NULL,50,'/assets/products/mix/mix-10.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(27,'檸檬紅茶','經典檸檬紅茶，酸甜可口','mix',45,55,'/assets/products/mix/mix-11.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"椰果\", \"蘆薈\"]',NULL,1,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(28,'檸檬綠茶','清新檸檬綠茶，提神解渴','mix',45,55,'/assets/products/mix/mix-12.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[\"椰果\", \"蘆薈\"]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(29,'梅露青','酸甜梅子搭配清爽青茶','mix',NULL,45,'/assets/products/mix/mix-13.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(30,'青梅翠綠','青梅與綠茶的清新組合','mix',NULL,45,'/assets/products/mix/mix-14.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09'),(31,'百香翠綠','熱帶百香果風味與綠茶的絕配','mix',NULL,45,'/assets/products/mix/mix-15.png',1,'[\"無糖\", \"微糖\", \"半糖\", \"正常糖\"]','[\"去冰\", \"微冰\", \"少冰\", \"正常冰\"]','[]',NULL,0,'2025-05-03 15:37:09','2025-05-03 15:37:09');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT '0',
  `role` enum('user','admin','manager') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `avatar` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (20,'charlie123','user1@example.com','$2b$10$bMwvGNjOnUxl7upG/yJZWeHEYf5.5CS2i8wsHj7yDRqGimJ8yEFJG','1234567890',1,'user','2025-04-22 17:46:34','2025-05-21 07:58:50','data:image/jpeg;base64,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'),(21,'吳傢澂','user2@example.com','$2b$10$YwbEwpwjfWB1l2Xl2hl09OiuzWKBW6TtNsIRN7mGQti3euFB8eY6S','',0,'user','2025-04-23 05:55:19','2025-04-23 05:55:19',NULL),(22,'admin','admin@example.com','$2b$10$a7VI91NtWM27/EzgpMhSp.PLYtNWy/2prGMvG5ldeW18gSjmi2XAm',NULL,1,'admin','2025-05-21 06:20:12','2025-05-21 06:20:12',NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `category` varchar(50) NOT NULL,
  `excerpt` text,
  `image` varchar(255) DEFAULT NULL,
  `detailImage` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `details` json DEFAULT NULL,
  `images` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isHidden` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'【新店開幕】新店總站店','2025-04-25','新店開幕','拾玖茶屋持續展店！新店總站店將於6月12日正式開幕營業。','/assets/news/news-1-out.png','/assets/news/news-1.png','拾玖茶屋持續展店！新店總站店將於6月12日正式開幕營業。開幕期間推出多項驚喜活動：\n1. 開幕首週，全品項飲品享9折優惠\n2. 消費滿100元，即贈限量拾玖茶屋環保吸管乙支\n3. 打卡分享並標記好友，有機會獲得免費飲品券','{\"phone\": \"02-8665-6339\", \"address\": \"新北市新店區北宜路一段26號\", \"openingDate\": \"2026/06/12\", \"openingHours\": \"(一)～(日) 11:00~20:00\"}','[]','2025-05-03 20:40:03','2025-06-09 12:36:55',0),(2,'【新店開張】豐原中正店','2025-04-22','新店開幕','我們很興奮地宣布，「拾玖茶屋」豐原中正店即將於6月1日盛大開幕！','/assets/news/news-2-out.png','/assets/news/news-2.png','我們很興奮地宣布，「拾玖茶屋」豐原中正店即將於6月1日盛大開幕！前往店內消費並出示此則消息，即可獲得開幕限定優惠：飲品買一送一（限量100杯）。期待您的蒞臨！','{\"phone\": \"04-2515-3123\", \"address\": \"台中市豐原區中正路21號\", \"openingDate\": \"2025/06/01\", \"openingHours\": \"(一)～(日) 10:30~21:30\"}','[]','2025-05-03 20:40:03','2025-05-03 20:40:03',0),(3,'【新店開幕】土城學府店','2025-03-01','新店開幕','土城的茶粉們來點名 (∩^o^)⊃━☆ﾟ.*･｡ 一起揪團喝爆！【拾汣茶屋土城學府店】即將於03/04 試營運囉！','/assets/news/news-3-out.webp','/assets/news/news-3.webp','土城學府店即將於3月4日開始試營運！試營運期間，全品項飲品享8折優惠。此外，凡消費並填寫意見回饋表，即贈送點數加倍。您的寶貴意見將幫助我們提供更好的服務！','{\"phone\": \"02-8260-1919\", \"address\": \"新北市土城區學府路一段62號\", \"openingDate\": \"2025/03/04\", \"openingHours\": \"(一)～(日) 10:00~22:00\"}','[\"/assets/news/news-3-2.webp\"]','2025-05-03 20:40:03','2025-05-03 20:40:03',0),(4,'【新品上市】超 PINEAPPLE 冰茶','2025-02-22','新品摸摸','初夏限定，繽紛水果茶系列驚喜登場！','/assets/news/news-4-out.webp','/assets/news/news-4.webp','誰最 PINE？我最 PINE！ (╯‵□′)╯超～派～登場啦！！\n價格大爆殺！原價 $120 殺！ $99 再折 19 元！\n超派價 【每杯 $80 元】\n一口喝下就脫口而出 「超派」的絕贊滋味等你來品嚐(*´∀`)~\n.\n▶︎超 PINEAPPLE 冰茶◀︎ L $80｜10/28 起全門市開賣\n.\n✤ 限定飲品每日有限量，實際販售情形請依店內為準。 起全門市開賣',NULL,'[]','2025-05-03 20:40:03','2025-05-03 20:40:03',0),(5,'【新品上市】中焙生乳紅茶','2025-02-10','新品摸摸','新品上市！中焙生乳紅茶，讓你一口愛上！','/assets/news/news-5-out.webp','/assets/news/news-5.png','『不管什麼恩怨，今天都用飲料解決吧！』\n聽起來很耳熟(*´･д･)? 別想了～重點是超好喝新品來囉！\n.\n✸ 中焙生～乳紅茶 ✸ M $49｜6/23 起全門市開賣\n拾汣究極生乳配方 對上 焙火紅茶茶湯 ～\n綿密濃醇乳香與茶香，在杯中交融出完美層次感ヾ(´︶`*)ﾉ\n.\n✤ 限定飲品每日有限量，實際販售情形請依店內為準。',NULL,'[]','2025-05-03 20:40:03','2025-05-03 20:40:03',0),(6,'【新品上市】愛荔殺殺','2025-02-10','新品摸摸','新品上市！中焙生乳紅茶，讓你一口愛上！','/assets/news/news-6-out.webp','/assets/news/news-6.png','沒時間解釋了 ( • ̀ω•́ ) 快跟汣編一起唸：\n『 霹哩卡☆霹哩拉拉～ ❤︎ 愛荔殺殺 ❤︎ 變好喝吧☆ 』\n什麼，你說資訊量過大？下面才是重點捏！\n.\n❤︎ 愛荔殺殺 ❤︎ L $78｜4/22 起全門市開賣\n薄荷、荔枝、紅茶茶湯和Ｑ彈椰果為你施下夢的魔法 ☆⌒(*^-゜)v\n更加入「舒亮姊姊超晶明」金盞花葉黃素飲，讓你明辨是非 👀\n價格也殺 殺 殺！ #夢想便宜大甩賣 ✨✨✨\n媽！汣編終於也買得起夢想了！｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡\n.\n✤ 期間限定飲品每日限量100杯，實際販售情形請依店內為準。',NULL,'[]','2025-05-03 20:40:03','2025-05-03 20:40:03',0),(7,'【重要公告】𝗗𝗲𝗠𝗮𝗿𝗰𝘂𝘀 𝗖𝗼𝘂𝘀𝗶𝗻𝘀 x 拾汣茶屋一日店長見面會','2024-01-25','重要公告','表弟 𝗗𝗲𝗠𝗮𝗿𝗰𝘂𝘀 𝗖𝗼𝘂𝘀𝗶𝗻𝘀 即將到 永吉店 與大家互動囉！','/assets/news/news-7-out.webp','/assets/news/news-7.webp','急報！就在明天(⁎⁍̴̛ᴗ⁍̴̛⁎) 表弟 𝗗𝗲𝗠𝗮𝗿𝗰𝘂𝘀 𝗖𝗼𝘂𝘀𝗶𝗻𝘀 即將到 永吉店 與大家互動囉！\n當天還有限定飲品 表弟奶茶 免費送給你❤︎\n.\n活動資訊\n𝟮𝟬𝟮𝟰.𝟭.𝟮𝟲 𝙁𝙍𝙄. 𝟭𝟬:𝟬𝟬~𝟭𝟭:𝟯𝟬\n❢拾汣茶屋永吉店｜台北市信義區永吉路30巷112號應！\n.\n▶︎表弟奶茶｜當日限量𝟭𝟬𝟬杯免費贈！一人限一杯，贈完為止。',NULL,'[]','2025-05-03 20:40:03','2025-05-03 20:40:03',0);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '門市名稱',
  `region` varchar(50) NOT NULL COMMENT '地區',
  `address` varchar(255) NOT NULL COMMENT '詳細地址',
  `phone` varchar(20) NOT NULL COMMENT '聯絡電話',
  `weekday_hours` varchar(100) DEFAULT NULL COMMENT '平日營業時間',
  `weekend_hours` varchar(100) DEFAULT NULL COMMENT '週末營業時間',
  `default_hours` varchar(100) DEFAULT NULL COMMENT '預設營業時間(若無分平日週末)',
  `note` text COMMENT '營業備註',
  `image` varchar(255) DEFAULT NULL COMMENT '門市外觀圖片路徑',
  `detail_image` varchar(255) DEFAULT NULL COMMENT '門市詳細圖片路徑',
  `latitude` double DEFAULT NULL COMMENT '緯度',
  `longitude` double DEFAULT NULL COMMENT '經度',
  `map_link` varchar(255) DEFAULT NULL COMMENT 'Google Maps連結',
  `is_new` tinyint(1) DEFAULT '0' COMMENT '是否為新門市',
  `online_order` tinyint(1) DEFAULT '1' COMMENT '是否支援線上訂餐',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_hidden` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否隱藏此門市',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='門市資訊表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'龍潭北龍店','桃園','桃園市龍潭區北龍路186號','03-480-6775','(日)~(四) 10:30-22:00','(五)~(六) 10:30-24:00',NULL,'特殊節日營業時間請依現場為準','/assets/stores/stores-1-out.png','/assets/stores/stores-1.png',24.863671,121.211828,'https://maps.app.goo.gl/Uao7AGDLQ7ocKp948',0,1,'2025-05-03 19:06:39','2025-05-03 19:06:39',0),(2,'大溪老街店','桃園','桃園市大溪區中央路看台下23號','03-3881633',NULL,NULL,'(一)~(日) 09:00~19:00','特殊節日營業時間請依現場為準','/assets/stores/stores-2-out.png','/assets/stores/stores-2.png',24.881371,121.286879,'https://maps.app.goo.gl/xGd1xodtSfDCdGQS8',0,1,'2025-05-03 19:06:39','2025-05-03 19:06:39',0),(3,'彰化南郭店','彰化','彰化市南郭路一段226-2號','04-7284549','(一)~(五) 10:30-22:00','(六)~(日) 10:30-21:00',NULL,'特殊節日營業時間請依現場為準','/assets/stores/stores-3-out.png','/assets/stores/stores-3.png',24.075321,120.545372,'https://maps.app.goo.gl/RFJTG2sUEk16b5JJ7',0,1,'2025-05-03 19:06:39','2025-05-03 19:06:39',0),(4,'台中豐原店','台中','台中市豐原區中正路21號','04-2515-3123',NULL,NULL,'(一)~(日) 10:30-21:30','特殊節日營業時間請依現場為準','/assets/stores/stores-4-out.webp','/assets/stores/stores-4.webp',24.242546,120.722562,'https://maps.app.goo.gl/M9HXnGr46tJ1MD4QA',1,1,'2025-05-03 19:06:39','2025-06-09 12:37:18',0),(5,'新店總站店','新北','新北市新店區北宜路一段26號','02-8665-6339',NULL,NULL,'(一)~(日) 11:00-20:00','特殊節日營業時間請依現場為準','/assets/stores/stores-5-out.webp','/assets/stores/stores-5.webp',24.969415,121.537681,'https://maps.app.goo.gl/53KG7Uhub2RNJzUV7',1,1,'2025-05-03 19:06:39','2025-05-03 19:06:39',0);
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tea_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11  7:53:31
