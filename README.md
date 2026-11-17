# Viikko 3 – Express REST API

Week 3 Express REST API assignments. The project uses Node.js ES modules and
Express to serve a JSON API and static files from the `public` directory.

## Run locally

```bash
npm install
npm run dev
```

The server listens on port 3000 by default. Copy `.env.example` to `.env` and
set the database connection values for your own MySQL database. Never commit
`.env` or use your Metropolia account password as the database password. Use
`DB_HOST=localhost` for a local MySQL/MariaDB server; for MariaDB Cloud, also
set `DB_PORT` as provided by the service. For production mode, run `npm start`.

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
- `POST /api/v1/cats` accepts a `multipart/form-data` form with a file in the
  `file` field (the legacy `cat` field is also accepted; images and videos up
  to 10 MB). A bearer token is required. The file is saved under `uploads/`,
  and the cat is stored in MySQL with Multer's generated filename.
  `POST /api/v1/users` validates and stores a user in MySQL.
- `PUT` and `DELETE /api/v1/cats/:id` and `/api/v1/users/:id` update and delete
  database records. Deleting a user also deletes their cats in a transaction.
- Invalid request data and route errors return JSON with an `error` object
  containing a message and HTTP status.
- `GET /public/söpökisaa.jpg` serves the sample image from `public`.
- `GET /` serves the welcome page.
