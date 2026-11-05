import {
  httpRequestTotal,
  httpRequestDuration,
} from "../config/metrics.js";

export function metricsMiddleware(req, res, next) {
  if (req.path === "/metrics") {
    return next();
  }

  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const duration =
      Number(process.hrtime.bigint() - start) / 1e9;

    // Use route templates, not raw request URLs.
    const route = req.route?.path
      ? `${req.baseUrl}${req.route.path}`
      : "unmatched";

    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode),
    };

    httpRequestTotal.inc(labels);
    httpRequestDuration.observe(labels, duration);
  });

  next();
}