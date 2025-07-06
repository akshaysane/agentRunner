const request = require('supertest');

jest.mock('../src/services', () => ({
  createLLMService: jest.fn(),
}));

const { createLLMService } = require('../src/services');

function loadApp() {
  jest.resetModules();
  return require('../src/app');
}

describe('Health Route', () => {
  test('GET /health returns ok', async () => {
    const app = loadApp();
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('LLM Route', () => {
  test('POST /llm streams response', async () => {
    const mockService = {
      stream: async function* () {
        yield 'hello ';
        yield 'world';
      },
    };
    createLLMService.mockReturnValueOnce(mockService);
    const app = loadApp();

    const res = await request(app)
      .post('/llm')
      .send({ prompt: 'Hi' })
      .expect(200)
      .expect('Content-Type', /text\/plain/);

    expect(res.text).toBe('hello world');
  });

  test('POST /llm without prompt returns 400', async () => {
    const app = loadApp();
    const res = await request(app).post('/llm').send({}).expect(400);
    expect(res.body).toEqual({ error: 'Prompt is required' });
  });
});
