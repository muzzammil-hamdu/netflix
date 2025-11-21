import client from 'prom-client';

const register = new client.Registry();
client.collectDefaultMetrics({ register });

export default async function handler(req, res) {
  res.setHeader("Content-Type", register.contentType);
  res.end(await register.metrics());
}
