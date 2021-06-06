# FidoFinder App

_By Andrew Dotterer - [Visit FidoFinder App](https://fidofinderapp.herokuapp.com/)_

**Table of Contents**

- [Application Architecture & Technologies Used](#application-architecture)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Getting Started](#getting-started)
- [Updates](#updates)

Meant to be a clone of [StackOverflow](https://www.stackoverflow.com), the updated project can be found [here](https://jsjungle.herokuapp.com/), while the original project and repo can be found [here](https://javascriptjungle.herokuapp.com) and [here](https://github.com/Giiaga/JavaScriptJungle), respectively.

# Application Architecture

![ApplicationArchitecture](./public/images/readme_appdesign.png)

# Frontend Overview

### _React_

The template engine implemented by Node.js.

![HOMEPAGE](./public/images/js_jungle_Screenshot_HOME.png)

# Backend Overview

### _Sequelize_

Sequelize establishes the database, models, and seeders. Seeder data fills Pug templates.

### _Express_

Express handles all routes using RESTful API and sends all information from the database.

### _API Routes (routes/index.js)_

```JS
  const homeRouter = require('./home');
  const usersRouter = require('./users');
  const apiRouter = require('./api');
  const questionRouter = require('./questions');
  const postRouter = require('./posts');
```

# Getting Started

### Prerequisites

- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jm-alan/JSJ-retooling
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Make a .env file

   ```JS
   DB_USERNAME=junglemaster
   DB_PASSWORD=password
   DB_DATABASE=db_name
   DB_HOST=localhost
   JWT_SECRET=your_secret
   JWT_EXPIRES_IN=604800
   SESSION_SECRET=your_secret
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

   ```JS
   npm start
   ```

6. Go to localhost:8080

   ```JS
   http://localhost:8080/
   ```

# Updates

_12/07/2020_

Fixed a bug where voting and delete functionality was not active on AJAX-rendered new answers to a question.
