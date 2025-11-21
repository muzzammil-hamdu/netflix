import client from "prom-client";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "netflix_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "code"]
});
register.registerMetric(httpRequestCounter);

const httpRequestDuration = new client.Histogram({
  name: "netflix_http_request_duration_seconds",
  help: "Request duration in seconds",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 3, 5]
});
register.registerMetric(httpRequestDuration);

export default async function handler(req, res) {
  res.setHeader("Content-Type", register.contentType);
  res.status(200).send(await register.metrics());
}
