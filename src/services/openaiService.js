class OpenAIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://api.openai.com/v1/chat/completions';
  }

  /**
   * Stream completion tokens from OpenAI.
   * Returns an async iterator yielding string chunks.
   */
  async *stream(prompt, options = {}) {
    const { model = 'gpt-3.5-turbo', temperature = 0.7 } = options;
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${errText}`);
    }

    const decoder = new TextDecoder();
    let buffer = '';

    for await (const chunk of response.body) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;
        const data = trimmed.replace(/^data:\s*/, '');
        if (data === '[DONE]') return;
        try {
          const parsed = JSON.parse(data);
          const token = parsed.choices?.[0]?.delta?.content;
          if (token) yield token;
        } catch {
          // ignore parsing errors for non-JSON lines
        }
      }
    }
  }

  /**
   * Convenience method to gather the full response by
   * consuming the streaming iterator.
   */
  async generate(prompt, options = {}) {
    let result = '';
    for await (const chunk of this.stream(prompt, options)) {
      result += chunk;
    }
    return result;
  }
}

module.exports = OpenAIService;
