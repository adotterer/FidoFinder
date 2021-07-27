# FidoFinder App

_By Andrew Dotterer - [Visit FidoFinder App](https://fidofinderapp.herokuapp.com/)_

**Table of Contents**

- [Application Architecture & Technologies Used](#application-architecture)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Getting Started](#getting-started)
- [Updates](#updates)

# Application Architecture

# Frontend Overview

### _React_

The template engine implemented by Node.js.

# Backend Overview

### _Sequelize_

Sequelize establishes the database, models, and seeders.

### _Express_

Express handles all routes using RESTful API and sends all information from the database.

### _API Routes_

# Getting Started

### Prerequisites

- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/adotterer/FidoFinder.git
   ```
2. Install NPM packages

   ```sh
   cd backend && npm install
   ```

   (back in the main directory)

   ```sh
   cd frontend & npm install
   ```

3. Make a .env file

   ```JS
   PORT=5000
   WEBPORT=3000
   DB_USERNAME=dog_db_admin
   DB_PASSWORD=password
   DB_DATABASE=dog_db
   DB_HOST=localhost
   JWT_SECRET=[YOUR SETUP]
   JWT_EXPIRES_IN=[YOUR SETUP]
   AWS_ACCESS_KEY_ID=[YOUR SETUP]
   AWS_SECRET_ACCESS_KEY=[YOUR SETUP]
   GOOGLE_API_SECRET=[YOUR SETUP]
   ```

4. Sequelize commands
   ```JS
   (First)
   npx dotenv sequelize db:create
   ```
   ```JS
   (Second)
   npx dotenv sequelize db:migrate
   ```
   ```JS
   (Third)
   npx dotenv sequelize db:seed:all
   ```
5. Start the app

   ```sh
   cd backend && npm start
   ```

   (back in the main directory)

   ```sh
   cd frontend & npm start
   ```

# Updates
