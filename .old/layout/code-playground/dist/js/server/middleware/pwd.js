"use strict";

require("core-js/modules/es.string.replace");

const __fs = require('fs');

module.exports = function pwd(req, res, next) {
  let pwd = process.env.PWD;
  const isApp = req.path.split('/').length >= 2 && req.path.split('/')[1] === 'app';
  let app = req.path.split('/')[2] || req.query.app; // if an app query parameter is found

  if (isApp && app) {
    // check if the node env exist
    let apps = req.config.apps;

    if (process.env.NODE_ENV && req.config.apps[process.env.NODE_ENV]) {
      apps = req.config.apps[process.env.NODE_ENV];
    }

    if (!apps[app]) {
      throw `The app ${app} is not defined in the code-playground.config.js file...`;
    }

    pwd = apps[app]; // } else if (req.session.pwd) {
    // 	pwd = req.session.pwd;
  } else if (req.config.cwd) {
    pwd = req.config.cwd;
  } // resolve path


  pwd = pwd.replace('~', process.env.HOME); // save in session

  req.session.pwd = pwd; // check that the PWD is valid

  if (!__fs.existsSync(pwd) || !__fs.existsSync(`${pwd}/code-playground.config.js`)) {
    // either the pwd passed does not exist, or no code-playground.config.js file
    // has been found at this emplacement...
    throw `The passed pwd "${pwd}" parameter is not a valid one...`;
  } // set pwd in config


  req.config.pwd = pwd; // next

  next();
};