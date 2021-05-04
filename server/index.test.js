process.env.NODE_ENV = "test";
import connection from '../index.js';
//const request = require("supertest");
//const app = require("../app");
import { getResource, getAllResources, insertPledge, getRequests, getPledgeById, updatePledge, insertResource, updateResource, getAllItems, deleteResource, deletePledge, getRequestById, insertResponse, updateRequestFulfill, getAllPledge, getPledgeByResourceID, matchUpdatePledge } from '../controllers/resources.js';

beforeAll(async () => {
  await connection.query("CREATE TABLE `disaster_resource` (`id` int NOT NULL AUTO_INCREMENT, `disasterID` int DEFAULT NULL, `resourceID` int DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
  await connection.query("CREATE TABLE `disasters` (`id` int NOT NULL AUTO_INCREMENT, `date` date NOT NULL, `location` varchar(45) NOT NULL, `type` varchar(45) NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `iddisasters_UNIQUE` (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
  await connection.query("CREATE TABLE `pledge` (`id` int NOT NULL AUTO_INCREMENT, `userID` int NOT NULL, `resourceID` int NOT NULL, `quantity` float DEFAULT NULL, `requestID` int DEFAULT NULL, `expiration` date DEFAULT NULL, `isValid` tinyint DEFAULT '1', PRIMARY KEY (`id`), UNIQUE KEY `idpledge_UNIQUE` (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
  await connection.query("CREATE TABLE `requests` (`id` int NOT NULL AUTO_INCREMENT, `requestorID` int DEFAULT NULL, `donorID` int DEFAULT NULL, `disasterID` int DEFAULT NULL, `resourceID` int DEFAULT NULL, `quantity` varchar(45) DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
  await connection.query("CREATE TABLE `resources` (`id` int NOT NULL AUTO_INCREMENT, `unit` varchar(45) NOT NULL, `resource` varchar(45) NOT NULL, `isValid` tinyint DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
  await connection.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(45) DEFAULT NULL, `username` varchar(500) NOT NULL, `password` varchar(500) NOT NULL, `location` varchar(200) DEFAULT NULL, `email` varchar(200) DEFAULT NULL, `mobile_num` varchar(500) DEFAULT NULL, `role` varchar(200) DEFAULT NULL, `zip` int DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `username_UNIQUE` (`username`) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
});

test('Adding a resource', () => {
  expect(insertPledge({body: {resourceId: 2, quantity: 5, userId: 1}}).statusCode).toBe(200);
})


afterAll(async () => {
  await connection.query("DROP TABLE disaster_resource, disasters, pledge, requests, resources, users");
  // db.end();
});
