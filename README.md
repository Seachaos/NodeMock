# NodeMock
a restful simple test api by Node.js


Just easy modify `resources.js` and will get you want API for test.  

default server is running at `http://127.0.0.1:8888/`  
change port in `utils/server.js`  

---

start server by run :  
`yarn install`  

`yarn start`  



# Example of resource 

```
const resources = {
  // go url like : http://127.0.0.1:8888/users
  users: {
    GET: load_from_file('users', [
      {first_name: 'steve', last_name: 'rogers'},
      {first_name: 'tony', last_name: 'stark'},
    ]),
    POST: save_to_file('users', (data, {req, res}) => {
      // do something like :
      // data.push({first_name: 'aa', last_name: 'bb'})
      return [data, {status: 'OK', msg: 'nothing change'}];
    })
  },

  // go url like : http://127.0.0.1:8888/test
  test: {
    GET: load_from_file('test', []),
    POST: save_to_file('test', (data, {req, res}) => {
      return [data, {status: 'OK'}];
    })
  },

  // go url like : http://127.0.0.1:8888/test_add_data_by_get_method
  test_add_data_by_get_method: {
    GET: save_to_file('test', (data, {req, res}) => {
      data.push('COOL:' + Date.now())
      return [data, {status: 0}];
    })
  }
}
...
```