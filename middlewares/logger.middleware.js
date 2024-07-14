const logger = (req, res, next) => {
  const methodColors = {
    GET: 'blue',
    POST: 'green',
    PUT: 'yellow',
    DELETE: 'red',
    PATCH: 'magenta',
  };

  const methodColor = methodColors[req.method]; // Default to white if method color is not defined

  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const contentLength = res.get('Content-Length');

    console.log(
      `${method} ${originalUrl} ${statusCode} ${duration} ms - ${contentLength} bytes`[
        methodColor
      ]
    );
  });

  next();
};

export default logger;
