# User Auth Service with React UI

This project is a full-stack authentication service built using Node.js, Nest.js, React.js, JWT, MongoDB, and Prisma. It includes both backend services and a frontend UI, all containerized using Docker. 

## Stack

- **Backend**: Node.js, Nest.js Express, Prisma ORM (MongoDB), Modular Structure, SOLID Principles
- **Frontend**: React.js with TypeScript and Atomic Design
- **Authentication**: JWT (JSON Web Tokens) stored securely via httpOnly cookies
- **Database**: MongoDB
- **ORM**: Prisma
- **Security**: Helmet, CORS, Rate Limiting

## How to Run

1. **Clone this repo**:
   ```bash
   git clone <repository-url>

2. **Install pnpm and dependencies (for local setup and e2e test run, without docker)**:
   ```bash
    CMD: npm instal -g pnpm
    CMD: pnpm instal

3. **Backend e2e test**:
   ```bash
    CMD: npm run test:e2e

- **Install Docker:** If you don't have Docker installed, you can download it from here.
- **Run the Application:** Navigate to the project directory and run the following command:

4. **Docker**:
   ```bash
    CMD: docker-compose up --build -d

This will build and run both the frontend and backend services.

Access the Application: Once the containers are successfully launched, open your browser and navigate to:

5. **Application URL**:
   ```bash
   http://localhost:3000

## Features

- **JWT Authentication:** Configured securely using httpOnly cookies to prevent XSS attacks.
- **Rate Limiting:** Limits the number of API requests to prevent abuse.
- **Helmet:** Protects the application by setting various HTTP headers (Correct).
   **CORS Protection:** Configured to restrict cross-origin access and prevent unauthorized API access.
  
## Project Structure

- **SOLID Principles:** The codebase follows the best practices of object-oriented design.
- **Atomic Design:** The frontend is structured using Atomic Design principles, promoting reusability and maintainability.
- **TypeScript:** Both the backend and frontend are built using TypeScript to ensure type safety.
- **Prisma ORM:** Used for data modeling and interaction with MongoDB.

## Dockerized Application

The entire app, including both frontend and backend, is fully Dockerized for easy deployment.

## Configuration

**Database Setup:**

This project uses MongoDB. You can create a free instance on MongoDB Atlas.
Update the DATABASE_URL in the docker-compose.yml file with your MongoDB instance connection string.

**Environment Variables:**

An example environment file (example.env) is included.

6. **Rename this to .env for local development:**
   ```bash
   mv example.env .env

## Notes

Ensure to configure your MongoDB database URL in the docker-compose.yml.
The rate limiting and security headers are enabled using libraries like express-rate-limit and helmet to provide basic protection against attacks.

Thank you for using this project! Feel free to contribute or ask questions.

**Author Email:** ehtasham.nasir89@gmail.com
