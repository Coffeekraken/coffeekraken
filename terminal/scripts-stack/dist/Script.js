"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const spawn = require('child_process').spawn;

const chalk = require('chalk');

const chokidar = require('chokidar');

const logSymbols = require('log-symbols');

const removeBlankLines = require('remove-blank-lines');

const terminate = require('terminate');

class Script {
  constructor(id, watchOpts = null, runner = 'npm') {
    this._id = id;
    this._runner = runner;
    this._stack = [];
    this._on = {};
    this._readed = true;
    this._isRunning = false;
    this._isWatched = false;
    this._watcher = null;
    this._watchOpts = watchOpts; // init the stack

    this._resetStack();
  }

  _resetStack() {
    // reset the stack
    this._stack = [`press ${chalk.yellow.bold('r')} to run or ${chalk.red.bold('e')} to exit the ${chalk.bold(this.id)} script`];
  }

  markAsRead() {
    this._readed = true;
  }

  run() {
    // do not run multiple times
    if (this.isRunning()) return; // reset the stack

    this._stack = []; // save the timestamp of the start

    const startTime = new Date().getTime(); // append that the script has been launched

    this._stack.push(chalk.yellow(`${logSymbols.warning} Start ${chalk.bold(this.id)}\n`));

    this._stack.push(chalk.yellow(`----------------------------------------\n`)); // dispatch new data


    this._dispatchData(null); // dispatch start


    this._dispatchStart(); // flag the script as running


    this._isRunning = true; // build command stack

    const commandArgs = [];
    if (this._runner === 'npm') commandArgs.push('run');
    commandArgs.push(this.id);
    commandArgs.push('--silent'); // spawn a new process with the runner and commandArgs

    this._childScript = spawn(this._runner, commandArgs, {
      detached: true
    });

    this._childScript.stdout.on('data', data => {
      // new data
      this._readed = false; // push new data to the stack

      this._stack.push(removeBlankLines(data.toString())); // dispatch new data


      this._dispatchData(data);
    });

    this._childScript.stderr.on('data', data => {
      // new data
      this._readed = false; // push new data to the stack

      this._stack.push(removeBlankLines(data.toString())); // dispatch new data


      this._dispatchData(data); // dispatch new warning


      this._dispatchWarning(data);
    });

    this._childScript.on('exit', (code, signal) => {
      this._isRunning = false; // end time

      const endTime = new Date().getTime();

      if (code === 0) {
        // append that the script has been launched
        this._stack.push(chalk.green(`----------------------------------------\n`));

        this._stack.push(chalk.green(`${logSymbols.success} Completed ${chalk.bold(this.id)} in ${(endTime - startTime) / 1000}s\n`));
      } else {
        // append that the script has been launched
        this._stack.push(chalk.red(`----------------------------------------\n`));

        this._stack.push(chalk.red(`${logSymbols.error} Error in ${chalk.bold(this.id)} after ${(endTime - startTime) / 1000}s\n`));
      } // dispatch new data


      this._dispatchData(null); // dispatch exit


      if (code === 0) {
        this._dispatchExit();
      } else if (code === 1) {
        this._dispatchError();
      }
    });
  }

  watch() {
    if (!this._watchOpts) return false;
    this._isWatched = true;
    const watchObj = this._watchOpts;
    this._watcher = chokidar.watch(watchObj.paths, Object.assign({}, watchObj.options));

    this._watcher.on('add', path => {
      this.run();
    }).on('change', path => {
      this.run();
    }).on('unlink', path => {
      this.run();
    });
  }

  unwatch() {
    if (!this._watchOpts || !this._watcher) return false;
    this._isWatched = false;

    this._watcher.close();
  }

  _dispatchStart() {
    if (this._on['start']) {
      this._on['start'].forEach(cb => {
        cb();
      });
    }
  }

  _dispatchWarning(data) {
    if (this._on['warning']) {
      this._on['warning'].forEach(cb => {
        cb(data);
      });
    }
  }

  _dispatchExit() {
    if (this._on['exit']) {
      this._on['exit'].forEach(cb => {
        cb();
      });
    }
  }

  _dispatchData(data) {
    if (this._on['data']) {
      this._on['data'].forEach(cb => {
        cb(data);
      });
    }
  }

  _dispatchError(data) {
    if (this._on['error']) {
      this._on['error'].forEach(cb => {
        cb(data);
      });
    }
  }

  kill() {
    this._dispatchExit();

    return new Promise((resolve, reject) => {
      if (!this._childScript) {
        reject(new Error(null));
        return;
      }

      try {
        terminate(this._childScript.pid, () => {
          resolve();
        });
      } catch (e) {
        resolve();
      }
    });
  }

  on(event, cb) {
    if (!this._on[event]) this._on[event] = [];

    this._on[event].push(cb);
  }

  off(event, cb) {
    if (!this._on[event]) this._on[event] = [];

    const idx = this._on[event].indexOf(cb);

    if (idx === -1) return;

    this._on[event].splice(idx, 1);
  }

  isRunning() {
    return this._isRunning;
  }

  isWatched() {
    return this._isWatched;
  }

  isWatchable() {
    return this._watchOpts !== null;
  }

  isReaded() {
    return this._readed;
  }

  get id() {
    return this._id;
  }

  get stack() {
    this.markAsRead();
    return this._stack;
  }

}

exports.default = Script;