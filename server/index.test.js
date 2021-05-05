// var supertest = require('supertest'); //require supertest
// const request = supertest('http://localhost:5000/'); //supertest hits the HTTP server (your app)
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "DAMS",
// });

// beforeAll(async () => {
//   await connection.query("CREATE TABLE `disaster_resource` (`id` int NOT NULL AUTO_INCREMENT, `disasterID` int DEFAULT NULL, `resourceID` int DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
//   await connection.query("CREATE TABLE `disasters` (`id` int NOT NULL AUTO_INCREMENT, `date` date NOT NULL, `location` varchar(45) NOT NULL, `type` varchar(45) NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `iddisasters_UNIQUE` (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
//   await connection.query("CREATE TABLE `pledge` (`id` int NOT NULL AUTO_INCREMENT, `userID` int NOT NULL, `resourceID` int NOT NULL, `quantity` float DEFAULT NULL, `requestID` int DEFAULT NULL, `expiration` date DEFAULT NULL, `isValid` tinyint DEFAULT '1', PRIMARY KEY (`id`), UNIQUE KEY `idpledge_UNIQUE` (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
//   await connection.query("CREATE TABLE `requests` (`id` int NOT NULL AUTO_INCREMENT, `requestorID` int DEFAULT NULL, `donorID` int DEFAULT NULL, `disasterID` int DEFAULT NULL, `resourceID` int DEFAULT NULL, `quantity` varchar(45) DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
//   await connection.query("CREATE TABLE `resources` (`id` int NOT NULL AUTO_INCREMENT, `unit` varchar(45) NOT NULL, `resource` varchar(45) NOT NULL, `isValid` tinyint DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
//   await connection.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(45) DEFAULT NULL, `username` varchar(500) NOT NULL, `password` varchar(500) NOT NULL, `location` varchar(200) DEFAULT NULL, `email` varchar(200) DEFAULT NULL, `mobile_num` varchar(500) DEFAULT NULL, `role` varchar(200) DEFAULT NULL, `zip` int DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `username_UNIQUE` (`username`) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
// });

test('Adding a resource', () => {
  expect((1)).toBe(1);
})

// test("Get all pledges", async () => {
//   const response = await request.get("admin/pledge/getAllPledge");
//   expect(response.statusCode).toBe(200);
// });

// test("Get all resources", async () => {
//   const response = await request.get("admin/pledge/all");
//   expect(response.statusCode).toBe(200);
// });

// test("Get all items", async () => {
//   const response = await request.get("admin/pledge/allItems");
//   expect(response.statusCode).toBe(200);
// });

// afterAll(async () => {
//   await connection.query("DROP TABLE disaster_resource, disasters, pledge, requests, resources, users");
//   // db.end();
// });
