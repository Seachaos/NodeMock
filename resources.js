import {load_from_file, save_to_file} from './utils/store'

const resources = {
  users: {
    GET: load_from_file('users', [
      {first_name: 'steve', last_name: 'rogers'},
      {first_name: 'tony', last_name: 'stark'},
    ]),
    POST: save_to_file('users', (data, {req, res}) => {
      // do something like :
      // data.push({first_name: 'aa', last_name: 'bb'})
      data.push(req.body)
      return [data, {status: 'OK', msg: 'nothing change'}];
    })
  },

  test: {
    GET: load_from_file('test', []),
    POST: save_to_file('test', (data, {req, res}) => {
      return [data, {status: 'OK'}];
    })
  },

  test_add_data_by_get_method: {
    GET: save_to_file('test', (data, {req, res}) => {
      data.push('COOL:' + Date.now())
      return [data, {status: 0}];
    })
  }
}

export default resources;