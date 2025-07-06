# agentRunner

`agentRunner` is a Node.js microservice intended to act as a backend for a chat
bot. The service will communicate with large language models (LLMs) and execute
recommended tools as part of a tool execution chain.

## Development

1. Install dependencies *(requires internet access)*:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. The health check endpoint will be available at `GET /health` and returns:

   ```json
   { "status": "ok" }
   ```

## Project Structure

- `src/index.js` – entry point that starts the HTTP server
- `src/app.js` – Express application setup
- `src/routes/` – route definitions
- `src/controllers/` – controller logic (request handlers)
- `src/services/` – business logic (future LLM and tool integration)

The project uses [Express](https://expressjs.com/) and [Nodemon](https://www.npmjs.com/package/nodemon)
for development.
