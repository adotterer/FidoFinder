# FidoFinder App

_By Andrew Dotterer - [Visit FidoFinder App](https://fidofinderapp.herokuapp.com/)_

**Table of Contents**

<!-- - [Application Architecture & Technologies Used](#application-architecture) -->

- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Getting Started](#getting-started)
- [Preparation Before Coding](#preparation)
- [Updates](#updates)

<!-- # Application Architecture -->

# Technologies Used

- Languages: ![](https://img.shields.io/badge/-JavaSript-ffffff?style=flat-square&logo=javascript&logoColor=ff0000)
  - Frontend:
    ![](https://img.shields.io/badge/-React-ffffff?style=flat-square&logo=react&logoColor=ff0000)
    ![](https://img.shields.io/badge/-Redux-ffffff?style=flat-square&logo=redux&logoColor=ff0000)
    ![](https://img.shields.io/badge/-CSS3-ffffff?style=flat-square&logo=css3&logoColor=ff0000)
    ![](https://img.shields.io/badge/-HTML5-ffffff?style=flat-square&logo=html5&logoColor=ff0000)
  - Backend:
    ![](https://img.shields.io/badge/-Node.js-ffffff?style=flat-square&logo=node.js&logoColor=ff0000)
    ![](https://img.shields.io/badge/-Express-ffffff?style=flat-square&logo=express&logoColor=ff0000)
    ![](https://img.shields.io/badge/-AWS--S3-ffffff?style=flat-square&logo=amazon-aws&logoColor=ff0000)
    ![](https://img.shields.io/badge/-PostgreSQL-ffffff?style=flat-square&logo=postgresql&logoColor=ff0000)
  - Frameworks and Libraries:
    ![](https://img.shields.io/badge/-Socket.IO-ffffff?style=flat-square&logo=socket.io&logoColor=ff0000)
    ![](https://img.shields.io/badge/-Twilio-ffffff?style=flat-square&logo=twilio&logoColor=ff0000)

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
   cd frontend && npm install
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
   TWILIO_ACCOUNT_SID=[YOUR SETUP]
   TWILIO_AUTH_KEY=[YOUR SETUP]
   TWILIO_PHONE_NUM=[YOUR TWILIO NUMBER]
   OWNER_PHONE_NUM=[YOUR PHONE NUMBER]
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
   cd frontend && npm start
   ```

# Preparation

[Visit FidoFinder Wiki to view my prep work for this project:](https://github.com/adotterer/FidoFinder/wiki)

- [Database Schema](https://github.com/adotterer/FidoFinder/wiki/Database-Schema)
- [WireFrames](https://github.com/adotterer/FidoFinder/wiki/Wireframes)
- [MVP and Stretch Goals](https://github.com/adotterer/FidoFinder/wiki/MVP's--&&--Stretch-Goals)
- [React Component List](https://github.com/adotterer/FidoFinder/wiki/React-Component-List)
- [Routes](https://github.com/adotterer/FidoFinder/wiki/Routes)

# Updates

_8/3/2021_ Add Twilio functionality to notify me of visitors
