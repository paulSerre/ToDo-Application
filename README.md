# Interview ensolvers

## Technologies

### Database

MySQL v5.7.31
You can find the database schema in docker-compose/mysql-init-files/init/ensolvers.sql.

### Backend

Node.JS v12.18.3
Express v4.17.1

### Frontend

Node.JS v12.18.3
Angular CLI v10.2.3
Angular v10.2.5

## Start the app

### With docker

The easiest way to run all at once (database, backend, frontend) is with docker. 
If you have it on your machine, just go in /docker-compose and run the command `docker-compose up --build`
The frontend is served with nginx.

### Manually

You can start it manually by importing the database schema in docker-compose/mysql-init-files/init/ensolvers.sql, then put db information in backend/config/db.config.js, and start back and frontend manually.


