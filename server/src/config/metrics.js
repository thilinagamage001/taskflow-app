import client from "prom-client";

//create a Registry 
const register = new client.Registry();

//collect default Node.js metrics
client.collectDefaultMetrics({ register });

//http request counter
export const httpRequestTotal = new client.Counter({
  name: "http_request_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

//http request duration 
export const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "HTTP request duration in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5], 
    registers: [register],
});

export { register };