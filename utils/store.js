import fs from 'fs';

const FILE_CACHE = {};

export const load_from_file = (name, default_value) => {
  fs.readFile(`./data/${name}`, 'utf8', function(err, contents) {
    if (contents) {
      FILE_CACHE[name] = JSON.parse(contents)
    } else {
      FILE_CACHE[name] = default_value
    }
  })

  return _ => {
    return FILE_CACHE[name];
  }
}

export const save_to_file = (name, reduce) => {
  const save_data = (content) => {
    fs.writeFile(`./data/${name}`, JSON.stringify(content), function(err) {
      if (err) {
        console.error('save file failed!')
      }
    })
  }

  return data => {
    const [content, response] = reduce(FILE_CACHE[name], data);
    FILE_CACHE[name] = content;
    save_data(content);
    return response;
  }

}


export default class Store{

}