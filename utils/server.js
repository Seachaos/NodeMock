import express from 'express';
import bodyParser from 'body-parser';
import resources from '../resources';

const port = 8888;

var app = express()

const formParser = bodyParser.urlencoded({ extended: false });

const enableCORS = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
}

app.use(formParser);
app.use('/public', express.static('public'));
app.use( (req, res) => {
  const path = req.url.replace(/^\/+|\/+$/g, '');
  const {method} = req;
  console.log('receive request : ', `[${method}]`, path);

  if (method=='POST') {
    console.log('post receive :', JSON.stringify(req.body));
  }

  // if resource available
  if (resources[path] && resources[path][method] ) {
    enableCORS(res);
    const response = resources[path][method]({
      req, res
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
    return
  }

  console.warn('resource not found');
  enableCORS(res);
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 1,
    msg: 'error, api not found'
  }));
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});