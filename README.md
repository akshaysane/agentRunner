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

## LLM Integration

The service communicates with large language models via pluggable providers.
Select the provider using the `LLM_PROVIDER` environment variable (defaults to
`openai`). For OpenAI you must also provide `OPENAI_API_KEY`.

### LLM Endpoint

- `POST /llm` – send a prompt and receive the generated response.
  ```json
  {
    "prompt": "Hello",
    "options": { "model": "gpt-3.5-turbo" }
  }
  ```

The response streams the generated text chunks as plain text. Clients should
consume the body incrementally until the connection closes. The server uses
HTTP chunked encoding so messages appear as the LLM produces them.

The project uses [Express](https://expressjs.com/) and [Nodemon](https://www.npmjs.com/package/nodemon)
for development.

## Frontend

A simple React interface is served from the `public/` directory. When the server is running, browse to `http://localhost:3000/` to interact with the chatbot. The page displays two panes:

- **Work area** – left side placeholder for future bot actions.
- **Chat pane** – right side interface to send prompts and view streaming responses from `/llm`.

The frontend uses React from CDN and requires no build step.
