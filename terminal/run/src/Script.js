const { spawn } = require("child_process");
const removeBlankLines = require("remove-blank-lines");
const terminate = require("terminate");

class Script {
  constructor(command) {
    this._command = command;
    this._stack = [];
    this._on = {};
    this._readed = true;
    this._isRunning = false;

    // init the stack
    this._resetStack();
  }

  _resetStack() {
    // reset the stack
    this._stack = [];
  }

  markAsRead() {
    this._readed = true;
  }

  run() {
    // return new promise
    return new Promise((resolve, reject) => {
      // do not run multiple times
      if (this.isRunning()) return;
      // reset the stack
      this._stack = [];
      // dispatch new data
      this._dispatchData(null);
      // dispatch start
      this._dispatchStart();
      // flag the script as running
      this._isRunning = true;
      // save the start time
      this._startTime = new Date().getTime();
      // split the command and the arguments
      const commandSplits = this._command.split(" ");
      const command = commandSplits.shift();
      // spawn the command into a new process
      this._childScript = spawn(command, commandSplits.concat(["--silent"]), {
        detached: true
      });
      this._childScript.stdout.on("data", data => {
        // new data
        this._readed = false;
        // push new data to the stack
        this._stack.push(removeBlankLines(data.toString()));
        // dispatch new data
        this._dispatchData(data);
      });
      this._childScript.stderr.on("data", data => {
        // new data
        this._readed = false;
        // push new data to the stack
        this._stack.push(removeBlankLines(data.toString()));
        // dispatch new data
        this._dispatchData(data);
        // dispatch new warning
        this._dispatchWarning(data);
      });
      this._childScript.on("exit", code => {
        this._isRunning = false;
        // end time
        this._endTime = new Date().getTime();
        if (code === 0) {
          // resolve the promise
          resolve(this._stack);
        } else {
          // resolve the promise
          reject(this._stack);
        }
        // dispatch new data
        this._dispatchData(null);
        // dispatch exit
        if (code === 0) {
          this._dispatchExit();
        } else if (code === 1) {
          this._dispatchError();
        }
      });
    });
  }

  _dispatchStart() {
    if (this._on.start) {
      this._on.start.forEach(cb => {
        cb();
      });
    }
  }

  _dispatchWarning(data) {
    if (this._on.warning) {
      this._on.warning.forEach(cb => {
        cb(data);
      });
    }
  }

  _dispatchExit() {
    if (this._on.exit) {
      this._on.exit.forEach(cb => {
        cb();
      });
    }
  }

  _dispatchData(data) {
    if (this._on.data) {
      this._on.data.forEach(cb => {
        cb(data);
      });
    }
  }

  _dispatchError(data) {
    if (this._on.error) {
      this._on.error.forEach(cb => {
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

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }
}

module.exports = Script;
