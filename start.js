require("@babel/register")({
  presets: ["@babel/preset-env"]
});

module.exports = require('./utils/server.js')