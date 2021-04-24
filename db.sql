CREATE TABLE `disasters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `location` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iddisasters_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pledge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `resourceID` int NOT NULL,
  `quantity` float DEFAULT NULL,
  `requestID` int DEFAULT NULL,
  `expiration` date DEFAULT NULL,
  `isValid` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idpledge_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `unit` varchar(45) NOT NULL,
  `resource` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `username` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `location` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `mobile_num` varchar(500) DEFAULT NULL,
  `role` varchar(200) DEFAULT NULL,
  `zip` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `request` (
                           `id` int NOT NULL AUTO_INCREMENT,
                           `donorId` int DEFAULT NULL,
                           `recipientId` int DEFAULT NULL,
                           `disasterId` int DEFAULT NULL,
                           `resourceId` int DEFAULT NULL,
                           `quantity` int DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
