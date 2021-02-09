// @ts-nocheck
// @shared

import __parseHtml from '../console/parseHtml';
import __trimLines from '../string/trimLines.js';
import __packageRoot from '../path/packageRoot';
import __toString from '../string/toString';

/**
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */

export default class SError extends Error {
  constructor(messageOrError) {
    let stack, message, originalMessage;

    if (messageOrError instanceof Error) {
      stack = messageOrError.stack;
      message = messageOrError.message;
    } else if (typeof messageOrError === 'string') {
      message = messageOrError;
    }
    originalMessage = message;

    if (typeof message !== 'string') {
      if (Array.isArray(message)) {
        message = message.join('\n');
      } else {
        message = __toString(message);
      }
    }

    // filter message for integrated stack
    message = message
      .split('\n')
      .filter((line) => {
        if (line.trim().slice(0, 10) === 'Thrown at:') return false;
        if (line.trim().slice(0, 3) === 'at ') return false;
        return true;
      })
      .join('\n');

    super(message);
    // if (Error && Error.captureStackTrace) {
    //   Error.captureStackTrace(this, this.constructor);
    // }

    let stackArray = [],
      finalStackArray = [];
    const packageRoot = __packageRoot();
    if (stack) {
      stackArray = stack.split('\n').slice(1);
      stackArray
        .filter((l) => {
          if (l.trim() === 'Error') return false;
          if (l.trim() === '') return false;
          return true;
        })
        .map((l) => {
          l = l.trim();

          l = l
            .replace(
              /at\s(.*)\(([a-zA-Z0-9\/-_\.]+:[0-9]{1,10}:[0-9]{1,10})\)$/,
              '\n<cyan>|</cyan> <magenta>$1</magenta>\n<cyan>|</cyan> <cyan>$2</cyan>'
            )
            .replace(`${__packageRoot(process.cwd(), true)}/`, '');

          if (l.match(/^at\s/)) {
            l = `\n<cyan>|</cyan> <cyan>${l.replace('at ', '')}</cyan>`;
          }
          if (l.match(/^->/)) {
            l = `\n<yellow>|---></yellow><yellow>${l.replace(
              '-> ',
              ''
            )}</yellow>`;
          }

          return l;
        })
        .forEach((l) => {
          if (l.trim() === '') return;
          finalStackArray.push(l);
        });
    }

    this.name = '';
    this.message = __trimLines(
      __parseHtml(`
      <red><underline>${this.name || this.constructor.name}</underline></red>

      ${message}

      ${finalStackArray.join('')}
    `)
    );
    this.stack = null;
    this.code = null;

    // let displayed = false;
    // Object.defineProperty(this, 'stack', {
    //   get: function () {
    //     if (displayed) return '';
    //     displayed = true;
    //     return this.message;
    //   },
    //   set: function (value) {
    //     this._stack = value;
    //   }
    // });
    // this.stack = __trimLines(__parseHtml(stack.join('')));
  }
}
