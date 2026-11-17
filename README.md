# Viikko 3 – Express REST API

Week 3 Express REST API assignments. The project uses Node.js ES modules and
Express to serve a JSON API and static files from the `public` directory.

## Run locally

```bash
npm install
npm run dev
```

The server listens on port 3000 by default. Create a `.env` file in the project
root with the settings for your MySQL database and a secret used to sign login
tokens:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=replace_with_a_long_random_secret
```

Never commit `.env` or use your Metropolia account password as the database
password. For MariaDB Cloud, set `DB_HOST` and `DB_PORT` to the values provided
by the service. `DB_PORT` can be omitted when the MySQL default port is used.
For production mode, run `npm start`.

Create a database in Metropolia's MySQL service (or locally), then import the
[assignment cats-db.sql schema](https://mattpe.github.io/wsk/database/cats-db.sql)
into that database using phpMyAdmin's SQL tab. Access to Metropolia's MySQL
server from the app requires the Metropolia network or VPN.

Run `npm run lint` to check JavaScript with ESLint and `npm run format` to format
the JavaScript files under `src/` with Prettier.

## Endpoints

- `GET /api/v1/cats` and `GET /api/v1/users` return all cats and users from
  MySQL. Cat responses include the owner's name as `owner_name`; user responses
  do not include passwords.
- `GET /api/v1/cats/:id` and `GET /api/v1/users/:id` return one item by ID.
- `GET /api/v1/cats/user/:id` returns the cats belonging to the given user.
- `POST /api/v1/auth/login` accepts a JSON body containing `username` and
  `password`, and returns a bearer token.
- `POST /api/v1/cats` accepts a `multipart/form-data` form with a file in the
  `file` field (the legacy `cat` field is also accepted; images and videos up
  to 10 MB). Include `cat_name`, `weight`, `owner`, and `birthdate`, and send
  the login token in the `Authorization: Bearer <token>` header. The file is
  saved under `uploads/`, and the cat is stored in MySQL with Multer's
  generated filename.
- `POST /api/v1/users` validates and stores a user in MySQL. Required fields
  are `name`, `username`, `email`, and `password`; `role` is optional.
- `PUT` and `DELETE /api/v1/cats/:id` and `/api/v1/users/:id` update and delete
  database records. Deleting a user also deletes their cats in a transaction.
- Invalid request data and route errors return JSON with an `error` object
  containing a message and HTTP status.
- `GET /public/söpökisaa.jpg` serves the sample image from `public`.
- `GET /` serves the welcome page.
