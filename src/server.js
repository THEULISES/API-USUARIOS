import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
// CORS abierto (para pruebas)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const BASE = 'https://fakerestapi.azurewebsites.net';

app.get('/users', async (req, res) => {
  try {
    const r = await fetch(`${BASE}/api/v1/Users`);
    const data = await r.json();
    res.status(r.ok ? 200 : r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Upstream error' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const r = await fetch(`${BASE}/api/v1/Users/${encodeURIComponent(req.params.id)}`);
    if (!r.ok) {
      return res.status(r.status).json({ error: `Upstream returned ${r.status}` });
    }
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: 'Upstream error' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const r = await fetch(`${BASE}/api/v1/Users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body ?? {}),
    });
    const data = await r.json().catch(() => ({}));
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Upstream error' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const r = await fetch(`${BASE}/api/v1/Users/${encodeURIComponent(req.params.id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body ?? {}),
    });
    const data = await r.json().catch(() => ({}));
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Upstream error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const r = await fetch(`${BASE}/api/v1/Users/${encodeURIComponent(req.params.id)}`, {
      method: 'DELETE',
    });
    // Some APIs return empty body on DELETE
    const text = await r.text();
    let body = {};
    try { body = text ? JSON.parse(text) : {}; } catch { body = { message: text } }
    res.status(r.status).json(body);
  } catch (e) {
    res.status(502).json({ error: 'Upstream error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
