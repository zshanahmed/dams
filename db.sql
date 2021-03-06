CREATE TABLE `disaster_resource` (
                                     `id` int NOT NULL AUTO_INCREMENT,
                                     `disasterID` int DEFAULT NULL,
                                     `resourceID` int DEFAULT NULL,
                                     PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `disasters` (
                             `id` int NOT NULL AUTO_INCREMENT,
                             `date` date NOT NULL,
                             `location` varchar(45) NOT NULL,
                             `type` varchar(45) NOT NULL,
                             PRIMARY KEY (`id`),
                             UNIQUE KEY `iddisasters_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `requests` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `requestorID` int DEFAULT NULL,
                            `donorID` int DEFAULT NULL,
                            `disasterID` int DEFAULT NULL,
                            `resourceID` int DEFAULT NULL,
                            `quantity` varchar(45) DEFAULT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `resources` (
                             `id` int NOT NULL AUTO_INCREMENT,
                             `unit` varchar(45) NOT NULL,
                             `resource` varchar(45) NOT NULL,
                             `isValid` tinyint DEFAULT '1',
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;