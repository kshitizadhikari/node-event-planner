# Event Planner Backend

Backend for the Event Planner application built with **Node.js**, **Express**, and **PostgreSQL**.

---

## Features

- User Authentication (Register/Login) using JWT
- CRUD operations for Events
- Tag management for Events
- Protected routes for authenticated users
- Repository pattern and structured architecture

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT authentication
- bcrypt for password hashing
- dotenv for environment variables

---

## Installation

# 1. Clone the repository (only once)

git clone git@github.com:kshitizadhikari/node-event-planner.git

# 2. Move into the project directory

cd node-event-planner

# 3. Create a PostgreSQL database

# Replace 'eventplanner' with your desired DB name

createdb eventplanner

# 4. Make sure your .env file has correct DB credentials, for example:

# DB_USER=postgres

# DB_PASSWORD="yourpassword" # wrap numeric passwords in quotes

# DB_HOST=localhost

# DB_PORT=5432

# DB_NAME=eventplanner

# 5. Install dependencies (if not done)

npm install

# 6. Initialize the database

node config/dbInit.js
