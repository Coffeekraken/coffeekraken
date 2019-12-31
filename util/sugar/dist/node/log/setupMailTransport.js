"use strict";

const __winston = require('winston');

const __winstonMail = require('winston-mail');

const __getAppMeta = require('../app/getAppMeta');
/**
 * @name                    setupMailTransport
 * @namespace               sugar.node.log
 * @type                    Function
 *
 * Setup a mail transport to send your logs to a certain email address
 *
 * @param           {String|Array}            emails            The emails where you want to send the logs to
 * @param           {String}                  [level='error']    The levels that you want to be send by email
 * @param           {Object}                  [winstonMailSettings={}]    Some [winston-mail](https://github.com/wavded/winston-mail) settings that you want to override
 *
 * @example         js
 * const setupMailTransport = require('@coffeekraken/sugar/node/log/setupMailTransport');
 * setupMailTransport(['hello@world.com', 'plop@youhou.com'], 'error', {});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function setupMailTransport(emails, level = 'error', winstonMailSettings = {}) {
  // get the app meta
  const appMeta = __getAppMeta();

  let contributorsArray = null;

  if (appMeta.contributors) {
    contributorsArray = [];
    appMeta.contributors.forEach(cont => {
      contributorsArray.push(`<a href="mailto:${cont.email}">${cont.name}</a>`);
    });
  }

  let list = '';

  if (appMeta.version) {
    list += `<li><strong>Version:</strong> ${appMeta.version}</li>`;
  }

  if (appMeta.homepage) {
    list += `<li><strong>Homepage:</strong> <a href="${appMeta.homepage}">${appMeta.homepage}</a></li>`;
  }

  if (appMeta.license) {
    list += `<li><strong>License:</strong> ${appMeta.license}</li>`;
  }

  if (appMeta.keywords) {
    list += `<li><strong>Keywords:</strong> ${appMeta.keywords.join(',')}</li>`;
  }

  if (appMeta.author) {
    list += `<li><strong>Author:</strong> ${appMeta.author}</li>`;
  }

  if (contributorsArray) {
    list += `<li><strong>Contributors:</strong> ${contributorsArray.join(', ')}</li>`;
  }

  const settings = {
    to: emails,
    from: appMeta.author || 'logger@coffeekraken.io',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    username: process.env.SMTP_USERNAME || process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
    subject: `${appMeta.name || 'Log'}: {{msg}}`,
    ssl: process.env.SMTP_SSL || false,
    tls: process.env.SMTP_TLS || true,
    level: level,
    unique: false,
    silent: false,
    html: true,
    formatter: ({
      level,
      message,
      meta
    }) => {
      return `
      <h1>${appMeta.name || 'Coffeekraken Logger'}</h1>
      <br />
      <p>${message}</p>
      <br />
      <ol>
        <li><strong>Level:</strong> ${level}</li>
        ${list}
      </ol>
      `;
    },
    ...winstonMailSettings
  };

  global._sLogger.add(new __winston.transports.Mail(settings));
};