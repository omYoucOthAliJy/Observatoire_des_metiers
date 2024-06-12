
# Observatoire Application

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Step 1: Clone the Repository

```sh
git clone <repository-url>
cd <repository-directory>
```


#### Database Configuration

```env
DB_TYPE=mysql
DB_HOST=mysql_container
DB_PORT=3306
DB_ROOT_USER=root
DB_ROOT_PASSWORD=<your-root-password>
DB_NAME=<your-database-name>
DB_SYNCHRONIZE=true
```

#### Mailer Configuration

```env
MAILER_HOST=<your-mailer-host>
MAILER_PORT=<your-mailer-port>
MAILER_USER=<your-mailer-user>
MAILER_PASSWORD=<your-mailer-password>
MAIL_FROM=<your-mail-from-address>
```

#### Authentication Configuration

```env
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=<your-jwt-expire-time>
JWT_SECRET_ADMIN=<your-admin-jwt-secret>
JWT_EXPIRE_ADMIN=<your-admin-jwt-expire-time>
```

#### Front-end Configuration

```env
FRONT_END_ORIGIN=http://127.0.0.1:3000
```

### Step 3: Start the Application

Run the following command to start the application:

```sh
docker-compose up --build
```

### Step 4: Access the Application

- The frontend application will be accessible at [http://localhost:3000](http://localhost:3000).
- The backend application will be accessible at [http://localhost:4000](http://localhost:4000).

## Docker Compose File Explanation

The provided `docker-compose.yml` file defines three services: `observatoire_frontend`, `observatoire_backend`, and `mysql`.

### Services

#### `observatoire_frontend`

- **context**: The build context for the frontend Docker image.
- **dockerfile**: The path to the Dockerfile for the frontend.
- **target**: The build stage to use for production.
- **container_name**: The name of the frontend container.
- **ports**: Maps port 3000 of the host to port 3000 of the container.
- **depends_on**: Ensures the backend service is started before the frontend.
- **environment**: Environment variables used by the frontend application.

#### `observatoire_backend`

- **context**: The build context for the backend Docker image.
- **dockerfile**: The path to the Dockerfile for the backend.
- **target**: The build stage to use for production.
- **container_name**: The name of the backend container.
- **ports**: Maps port 4000 of the host to port 4000 of the container.
- **volumes**: Mounts the node_modules directory to persist dependencies.
- **depends_on**: Ensures the MySQL service is started before the backend.
- **environment**: Environment variables used by the backend application.

#### `mysql`

- **image**: The Docker image for MySQL.
- **environment**: Environment variables for configuring the MySQL database.
- **container_name**: The name of the MySQL container.
- **ports**: Maps port 3306 of the host to port 3306 of the container.

## Environment Variables

### Database Configuration

- `DB_TYPE`: The type of database (e.g., mysql).
- `DB_HOST`: The hostname of the database server (e.g., mysql_container).
- `DB_PORT`: The port number of the database server (e.g., 3306).
- `DB_ROOT_USER`: The root user for the database (e.g., root).
- `DB_ROOT_PASSWORD`: The root user's password for the database.
- `DB_NAME`: The name of the database to connect to.
- `DB_SYNCHRONIZE`: Whether to synchronize the database schema on startup (true or false).

### Mailer Configuration

- `MAILER_HOST`: The SMTP host for sending emails.
- `MAILER_PORT`: The SMTP port for sending emails.
- `MAILER_USER`: The SMTP user for sending emails.
- `MAILER_PASSWORD`: The SMTP user's password.
- `MAIL_FROM`: The default "from" address for outgoing emails.

### Authentication Configuration

- `JWT_SECRET`: The secret key used for signing JWT tokens.
- `JWT_EXPIRE`: The expiration time for JWT tokens.
- `JWT_SECRET_ADMIN`: The secret key used for signing admin JWT tokens.
- `JWT_EXPIRE_ADMIN`: The expiration time for admin JWT tokens.

### Front-end Origin

- `FRONT_END_ORIGIN`: The origin URL for the frontend application (e.g., http://127.0.0.1:3000).
```

This README provides clear instructions for setting up and running the Observatoire application, including details on required environment variables and explanations of the Docker Compose configuration.