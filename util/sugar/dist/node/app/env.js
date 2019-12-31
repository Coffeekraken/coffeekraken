"use strict";

const __fs = require('fs');

const __dotEnv = require('dotenv');
/**
 * @name                    env
 * @namespace               sugar.node.app
 * @type                     Function
 *
 * Initialize some data into the 'process.env' stack like '.env' and 'package.json' files...
 * Sources:
 * - `.env` file at `process.cwd()` path
 * - `package.json` file at `process.cwd()` path
 * - Setting the 'package.json' content inside the 'process.env.PACKAGE' variable
 *
 * @return          {Object}                    Return the `process.env` object stack
 *
 * @example         js
 * const env = require('@coffeekraken/sugar/node/app/env');
 * env();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function env() {
  // load .env file
  __dotEnv.config(); // check if a package.json file exist at process root


  if (__fs.existsSync(`${process.cwd()}/package.json`)) {
    const packageJson = require(`${process.cwd()}/package.json`); // set the packageJson into the process.env stack


    process.env.PACKAGE = packageJson;
  } // return the env stack


  return process.env;
};