import {load_from_file, save_to_file} from './utils/store'

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

  test_add_by_get: {
    GET: save_to_file('test', (data, {req, res}) => {
      data.push('COOL:' + Date.now())
      return [data, {status: 0}];
    })
  }
}

export default resources;