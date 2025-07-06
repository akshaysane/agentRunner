const express = require('express');
const healthRouter = require('./routes/health');
const llmRouter = require('./routes/llm');

const app = express();

app.use(express.json());
app.use('/health', healthRouter);
app.use('/llm', llmRouter);

module.exports = app;
