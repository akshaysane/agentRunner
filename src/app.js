const express = require('express');
const path = require('path');
const healthRouter = require('./routes/health');
const llmRouter = require('./routes/llm');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/health', healthRouter);
app.use('/llm', llmRouter);

module.exports = app;
