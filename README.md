# Viikko 3 – Express REST API

Week 3 Express REST API assignments. The project uses Node.js ES modules and
Express to serve a JSON API and static files from the `public` directory.

## Run locally

```bash
npm install
npm run dev
```

The server listens on port 3000 by default. Set `PORT` in a `.env` file to use
a different port. For production mode, run `npm start`.

Run `npm run lint` to check JavaScript with ESLint and `npm run format` to format
the JavaScript files under `src/` with Prettier.

## Endpoints

- `GET /api/v1/cats` and `GET /api/v1/users` return all cats and users.
- `GET /api/v1/cats/:id` and `GET /api/v1/users/:id` return one item by ID.
- `POST /api/v1/cats` and `POST /api/v1/users` add an item in memory.
- `PUT` and `DELETE /api/v1/cats/:id` and `/api/v1/users/:id` return the
  assignment's hard-coded confirmation messages.
- `GET /public/söpökisaa.jpg` serves the sample image from `public`.
- `GET /` serves the welcome page.

The sample cat and user data is stored in memory and resets when the server
restarts.
