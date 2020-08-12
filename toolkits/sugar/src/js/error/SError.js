import __parseHtml from '../console/parseHtml';
import __trimLines from '../string/trimLines.js';
import __packageRoot from '../path/packageRoot';

export default class SError extends Error {
  constructor(message) {
    try {
      super();

      Error.captureStackTrace(this, this.constructor);

      const packageRoot = __packageRoot();
      let stack = this.stack;
      let stackArray = [];
      stack
        .split(/\s+?at\s/)
        .filter((l) => {
          if (l.trim() === 'Error') return false;
          return true;
        })
        .forEach((l) => {
          stackArray.push(
            `<cyan>│</cyan> at <cyan>${l.replace(packageRoot, '')}</cyan>`
          );
        });

      const errorString = __trimLines(
        __parseHtml(`<underline><bold><red>${
          this.constructor.name
        }</red></bold></underline>

        ${message}
        <cyan><underline>Stack</underline></cyan>

        ${stackArray.join('\n')}`)
      );
      // this.syscall = null;
      // this.code = null;
      // this.property = null;
      this.message = errorString;
      // this.stack = null;
      this.name = this.constructor.name;
    } catch (e) {}
  }
}
