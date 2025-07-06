const { createLLMService } = require('../services');

const llmService = createLLMService();

exports.generate = async (req, res) => {
  const { prompt, options } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  // Disable buffering proxies and ensure chunks are sent as soon as possible
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  if (typeof res.flushHeaders === 'function') {
    res.flushHeaders();
  }

  try {
    for await (const chunk of llmService.stream(prompt, options)) {
      res.write(chunk);
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'LLM request failed' });
  }
};
