const __winston = require('winston');
const __winstonMail = require('winston-mail');
const __getAppMeta = require('../app/getMeta');

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

  const settings = {
    to: emails,
    from: appMeta.author || 'logger@coffeekraken.io',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    username: process.env.SMTP_USERNAME || process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
    subject: `${appMeta.name || 'Log'}: {{msg}}`,
    ssl: process.env.SMTP_SSL || false,
    tls: process.env.SMTP_TLS || true,
    level: level,
    unique: false,
    silent: false,
    html: false,
    ...winstonMailSettings
  };

  global._sLogger.add(new __winston.transports.Mail(settings));

}
