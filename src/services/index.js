const OpenAIService = require('./openaiService');

function createLLMService() {
  const provider = process.env.LLM_PROVIDER || 'openai';
  switch (provider) {
    case 'openai':
    default:
      return new OpenAIService(process.env.OPENAI_API_KEY);
  }
}

module.exports = { createLLMService };
