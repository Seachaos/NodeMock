const http = require('http');
import {load_from_file, save_to_file} from './utils/store'

const hostname = '127.0.0.1';
const port = 8888;


const resources = {
  users: {
    GET: load_from_file('users', []),
    POST: save_to_file('users', (data, {req, res}) => {
      return [data, {status: 'OK'}];
    })
  },
  test: {
    GET: load_from_file('test', []),
    POST: save_to_file('test', (data, {req, res}) => {
      return [data, {status: 'OK'}];
    })
  },
  test_add: {
    GET: save_to_file('test', (data, {req, res}) => {
      data.push('COOL:' + Date.now())
      return [data, {status: 'OK'}];
    })
  }
}


const server = http.createServer((req, res) => {
  const path = req.url.replace(/^\/+|\/+$/g, '');
  const {method} = req;
  console.log(path, method);
  if (resources[path] && resources[path][method] ) {
    const response = resources[path][method]({
      req, res
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
    return
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});