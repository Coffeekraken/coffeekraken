import __parseHtml from '../console/parseHtml';
import __trimLines from '../string/trimLines.js';
import __packageRoot from '../path/packageRoot';
import __toString from '../string/toString';

export default class SError extends Error {
  constructor(message) {
    super();

    Error.captureStackTrace(this, this.constructor);

    if (typeof message === 'object') {
      if (message.syscall) this.syscall = message.syscall;
      if (message.code) this.code = message.code;
      if (message.property) this.property = message.property;
      if (message.message) this.message = message.message;
      if (message.name) this.name = message.name;
      if (message.stack) this.stack = message.stack;
    } else if (typeof message !== 'string') {
      this.message = __trimLines(message.toString());
      this.name = this.constructor.name;
      this.stack = message.stack || [];
      this.code = message.code || null;
      this.property = message.property || null;
      this.syscall = message.syscall || null;
    } else {
      this.message = __toString(message);
      this.name = null;
    }

    const packageRoot = __packageRoot();
    if (this.stack) {
      const stack = [];
      const stackArray = this.stack.split('at ').slice(1);
      stackArray
        .filter((l) => {
          if (l.trim() === 'Error') return false;
          if (l.trim() === '') return false;
          return true;
        })
        .forEach((l) => {
          stack.push(
            `<cyan>│</cyan> at <cyan>${l.replace(packageRoot, '')}</cyan>`
          );
        });
      this._stackString = stack.join('\n');
    }
  }

  inspect() {
    return this.toString();
  }

  toString() {
    // '⠀'
    if (this.message.match(/___$/gm)) return this.message;

    const string = __trimLines(
      __parseHtml(`
      <red><underline>${this.constructor.name}</underline></red>

      ${this.message}

      ${this._stackString}
    `)
    );
    return string + '___';
    return 'cc';
    return this.message;
  }
}
