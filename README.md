# CRM Backend

This is the backend for the CRM system built with NestJS, using GraphQL for API communication and MongoDB as the database. The backend provides services such as user management, payroll, leaves, departments, and timesheet management. It uses JWT authentication and includes role-based access control (RBAC).

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [GraphQL](#graphql)
- [Environment Variables](#environment-variables)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo/backend

2. Install dependencies:

  ```bash
  npm install

## Configuration

  ```bash 
  JWT_SECRET=your_super_secret_key

  MONGO_URI=mongodb+srv://<your-db-username>:<your-db-password>@cluster.mongodb.net/your-database-name?retryWrites=true&w=majority

  AWS_ACCESS_KEY_ID=your-aws-access-key
  AWS_SECRET_ACCESS_KEY=your-aws-secret-key
  AWS_REGION=ap-south-1
  ```

---

## Installation
```bash
npm run start:dev
```

## GraphQL

```bash
http://localhost:3000/graphql
```
