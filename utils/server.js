import http from 'http';
import resources from '../resources';

const hostname = '127.0.0.1';
const port = 8888;

const server = http.createServer( (req, res) => {
  const path = req.url.replace(/^\/+|\/+$/g, '');
  const {method} = req;
  console.log('receive request : ', `[${method}]`, path);

  // if resource available
  if (resources[path] && resources[path][method] ) {
    const response = resources[path][method]({
      req, res
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
    return
  }

  console.warn('resource not found');
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 1,
    msg: 'error, api not found'
  }));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});