const __getAppMeta = require('../../app/getAppMeta');
const __nodemailer = require('nodemailer');

/**
 * @name                    mail
 * @namespace               sugar.node.log.transports
 * @type                    Function
 *
 * Setup a mail transport to send your logs to a certain email address
 *
 * The available settings the [nodemailer](https://nodemailer.com/about/) transport object to configure how your emails are going to be sent mixed with these settings:
 * - from: (default: %level}@%domain) The email address you want to send the mail from
 * - to: (default: log@%domain) Either 1 destination email or a comma separated list of emails
 * - subject: (default: %level}@%domain) The email subject
 * The %domain variable will be replaced either by the settings.domain value or package.json "domain" property or by the environment variable process.env.DOMAIN
 *
 * By default, this transport is configured using the gmail smtp infos. If you want you can set these two environment variables and that's it...
 * - process.env.GMAIL_USER
 * - process.env.GMAIL_PASSWORD
 * !!! Please note that for gmail to work you need to activate the "less secure apps login" [here](https://myaccount.google.com/lesssecureapps?pli=1)
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
module.exports = function mail(message, level = 'info', settings = {}) {
  return new Promise((resolve, reject) => {

    // get the app meta
    const appMeta = __getAppMeta();

    settings = {
      from: `${level}@${settings.domain || appMeta.domain}`,
      to: settings.to || `log@${settings.domain || appMeta.domain}`,
      subject: `${level}@${settings.domain || appMeta.domain}`,
      ...settings
    };

    let contributorsArray = null;
    if (appMeta.contributors) {
      contributorsArray = [];
      appMeta.contributors.forEach((cont) => {
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

    // create the nodemailer transporter
    const transporter = __nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      },
      ...settings
    });

    try {
      // send the email using nodemailer
      transporter.sendMail({
        from: settings.from,
        to: settings.to,
        subject: settings.subject,
        html: `
          ${message}
          <br/><br/>
          ${list}
        `
      }).then(result => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    } catch(e) {
      console.error(e);
    }

  });
}
