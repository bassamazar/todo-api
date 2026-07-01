Todo-API with Intelligent Role-Based Access Control
A secure, robust, and scalable RESTful API built for managing tasks, designed with security-first principles including JWT authentication and role-based access control.

🔑 Key Features
Secure Authentication: JWT-based user session management.

Ownership Protection: Intelligent middleware prevents users from accessing or modifying tasks belonging to other users.

Role-Based Access Control (RBAC): Modular architecture for managing user roles and permissions.

API Security: Protection against common vulnerabilities like Insecure Direct Object Reference (IDOR).

Clean Architecture: Separation of concerns using Controllers, Middlewares, and Services.

🌟 Features Demonstrated
✅ RESTful API Design: Clean and structured endpoints for efficient resource management.

✅ JWT Authentication & Authorization: Secure session management ensuring protected access to user data.

✅ Role-based Access (Admin/User): Modular architecture to distinguish between user permissions and administrative tasks.

✅ Professional Error Handling: Robust feedback mechanism that ensures system stability during unauthorized requests.

🚀 Prerequisites
Ensure you have the following installed on your machine:

Node.js (Recommended version: 18+)

npm

A PostgreSQL database

⚙️ Setup & Installation
1. Clone the repository:
  git clone <repository-url>
  cd todo-api
2. Install all libraries:
    npm install
3. Configure Environment:
Create a .env file in the root folder and add your credentials:
   DATABASE_URL="your-database-connection-string"
   JWT_SECRET="your-super-secret-key"

4. Initialize Database:
   npx prisma generate
       Apply the database schema:
           npx prisma migrate dev --name init --schema=src/prisma/schema.prisma
5. Start the server:
    node src/server.js

now the server will run at http://localhost:3000 

🌐 API Endpoints

1. Authentication(/api/auth)
POST /auth/register: Create a new user account.

POST /auth/login: Log in to receive a JWT access token.

2. users(/api/users)
GET /all: Retrieve a list of all users

3. todos (/api/todos)
POST /new: Create a new task (requires authentication).

GET /get: Retrieve all tasks for the authenticated user.

GET /get/:id: Retrieve a specific task by ID (requires authentication & ownership).

PUT /update/:id: Update task details (requires authentication & ownership).

PATCH /:id/status: Toggle task status (requires authentication & ownership).

DELETE /del/:id: Remove a task (requires authentication & ownership).
