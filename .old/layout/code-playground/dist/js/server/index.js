"use strict";

require("core-js/modules/web.dom-collections.iterator");

const __merge = require('lodash/merge');

const __clone = require('lodash/cloneDeep');

const __express = require('express');

const __expressHandlebars = require('express-handlebars');

const __path = require('path');

const __fs = require('fs');

const __url = require('url');

const __md5 = require('md5');

const __Cryptr = require('cryptr');

const __cookieSession = require('cookie-session');

const __request = require('request');

const __packageJson = require('../../../package.json');

const __aes = require('@coffeekraken/sugar/js/crypt/aes');

const __base64 = require('@coffeekraken/sugar/js/crypt/base64');

const __isBase64 = require('@coffeekraken/sugar/node/is/base64');

const __queryString = require('querystring');

const {
  spawn
} = require('child_process');

const __sleep = require('@coffeekraken/sugar/js/function/sleep');

const __uniqid = require('@coffeekraken/sugar/js/string/uniqid');

const __log = require('@coffeekraken/sugar/node/log/log');

const __setupMailTransport = require('@coffeekraken/sugar/node/log/setupMailTransport');

const __setupSlackTransport = require('@coffeekraken/sugar/node/log/setupSlackTransport');

const __initApp = require('@coffeekraken/sugar/node/app/initApp');

const __gravatarUrl = require('@coffeekraken/sugar/js/util/gravatarUrl');

const __setGithubAuthToken = require('@coffeekraken/sugar/node/github/setAuthToken');

const __getGithubAuthToken = require('@coffeekraken/sugar/node/github/getAuthToken');

const __downloadFolder = require('@coffeekraken/sugar/node/github/downloadFolder');

const __decodeBase64 = require('@coffeekraken/sugar/node/string/decodeBase64');

module.exports = function (config) {
  // init app
  __initApp(); // setup mail transport


  if (process.env.ENV === 'production') {
    if (process.env.LOG_MAIL) __setupMailTransport(process.env.LOG_MAIL);

    __setupSlackTransport();
  } // creating the app


  const app = __express();

  let request = null;
  handlerbarsEngine = __expressHandlebars.create({
    layoutsDir: __dirname + '/../../../src/views/layouts',
    partialsDir: __dirname + '/../../../src/views',
    defaultLayout: 'main'
  }); // handlebars

  app.engine('handlebars', __expressHandlebars({
    layoutsDir: __dirname + '/../../../src/views/layouts',
    defaultLayout: 'main'
  }));
  app.set('views', __dirname + '/../../../src/views');
  app.set('view engine', 'handlebars'); // static files

  app.use('/dist', __express.static(__dirname + '/../../../dist')); // cookie session

  app.set('trust proxy', 1);
  app.use(__cookieSession({
    name: 'code-playground-' + __md5(config.cwd),
    secret: 'coffeekraken-code-playground',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours

  })); // expose the request to the global scope

  app.use((req, res, next) => {
    req.config = config;
    request = req;
    next();
  }); // protect

  app.use((req, res, next) => {
    if (req.session.appId && req.url) {
      try {
        const filePath = `${process.cwd()}/appsRoot/${req.session.appId}${req.url}`;

        const stats = __fs.lstatSync(filePath);

        if (stats.isFile()) {
          res.sendFile(filePath);
          return;
        }
      } catch (e) {}
    } else if (req.url) {
      try {
        const filePath = `${process.cwd()}${req.url}`;

        const stats = __fs.lstatSync(filePath);

        if (stats.isFile()) {
          res.sendFile(filePath);
          return;
        }
      } catch (e) {}
    }

    next();
  });

  const server = require('http').Server(app);

  const io = require('socket.io')(server); // github auth token


  __setGithubAuthToken('olivierbossel', __decodeBase64('MTFkOGM5ZjAwODJmN2JlY2M0OGU3YTBmNjhhZDRiNWJiZGFkOGQyZg=='));

  const authToken = __getGithubAuthToken();

  io.on('connection', socket => {
    socket.on('SSocketDom.encryptUrl', () => {
      handlerbarsEngine.render("src/views/encryptUrl.handlebars").then(renderedHtml => {
        socket.emit('SSocketDom.content', {
          data: renderedHtml,
          innerHtml: {
            animIn: 'fadeUp',
            animOut: 'fadeDown'
          }
        });
      });
    });
    socket.on('SSocketDom.githubApp', async appUrl => {
      // processing the github url
      const urlParts = appUrl.split('/');
      const repo = `${urlParts[3]}/${urlParts[4]}`;
      const path = urlParts.slice(7).join('/'); // encrypt the app url

      const encryptedAppUrl = Buffer.from(appUrl).toString('base64'); // app cwd

      const appsCwd = process.cwd() + '/appsRoot';
      const appCwd = process.cwd() + '/appsRoot/' + encryptedAppUrl;
      await __sleep(500);
      const options = {
        url: `https://api.github.com/repos/${repo}/contents/${path}`,
        headers: {
          'User-Agent': 'coffeekraken-code-playground',
          'Authorization': `token ${authToken.token}`
        }
      }; // Set first message to the user

      socket.emit('SSocketDom.loading', {
        data: 'Initializing Github based app...'
      });
      await __sleep(500);

      __request(options, async (error, response, body) => {
        const files = JSON.parse(body);
        const packageJson = files.find(file => file.name === 'package.json');
        const codePlaygroundConfig = files.find(file => file.name === 'code-playground.config.js'); // getting package.json content

        socket.emit('SSocketDom.loading', {
          data: 'Getting "package.json" application content...'
        });
        await __sleep(500); // download the package.json content and the code-playground.config.js content

        __request(packageJson.download_url, async (error, response, packageJsonBody) => {
          // parse the package json data
          const packageJson = JSON.parse(packageJsonBody); // process contributors avatars

          packageJson.contributors.forEach(contributor => {
            contributor.gravatar = __gravatarUrl(contributor.email);
          }); // creating the app directory on the server

          socket.emit('SSocketDom.loading', {
            data: `Creating "${packageJson.name}" application root folder...`
          });
          socket.emit('SSocketDom.packageJson', {
            data: packageJson
          }); // rendering toplinks and send them to the interface

          handlerbarsEngine.render("src/views/topLinks.handlebars", {
            packageJson
          }).then(renderedHtml => {
            socket.emit('SSocketDom.topLinks', {
              data: renderedHtml
            });
          });
          await __sleep(500); // create the app folder

          spawn(`mkdir "${encryptedAppUrl}"`, null, {
            shell: true,
            cwd: appsCwd
          }).on('close', code => {
            // write the package.json file in the app folder
            __fs.writeFileSync(appCwd + '/package.json', packageJsonBody);

            socket.emit('SSocketDom.loading', {
              data: 'Installing NPM dependencies...'
            }); // install the dependencies

            spawn(`npm i`, null, {
              shell: true,
              cwd: appCwd
            }).on('close', async code => {
              if (code !== 1) {
                handlerbarsEngine.render("src/views/error.handlebars", {
                  error: `Something went wrong during the dependencies installation...<br />
									Please try again later...`
                }).then(renderedHtml => {
                  socket.emit('SSocketDom.content', {
                    data: renderedHtml,
                    innerHtml: {
                      animIn: 'fadeUp',
                      animOut: 'fadeDown'
                    }
                  });
                });
                return;
              } // creating the app directory on the server


              socket.emit('SSocketDom.loading', {
                data: `Getting the "code-playground.config.js" file content...`
              });
              await __sleep(500); // download the package.json content and the code-playground.config.js content

              __request(codePlaygroundConfig.download_url, async (error, response, codePlaygroundConfigBody) => {
                // parse the package json data
                const codePlaygroundConfig = eval(codePlaygroundConfigBody); // downloading the assets d irectories

                socket.emit('SSocketDom.loading', {
                  data: `Downloading the assets directories...`
                });
                await __sleep(500); // download all the listed assets folders in the config

                const assetsDirDownloadPromises = [];
                (codePlaygroundConfig.assetsDir || []).forEach(assetsDir => {
                  assetsDirDownloadPromises.push(__downloadFolder(repo, path + '/' + assetsDir, appCwd).then(response => {}).catch(error => {
                    console.log('error', error);
                  }));
                });
                Promise.all(assetsDirDownloadPromises).then(response => {
                  // render the page
                  handlerbarsEngine.render("src/views/home.handlebars", {
                    pwd: Buffer.from(appCwd).toString('base64'),
                    ...codePlaygroundConfig
                  }).then(renderedHtml => {
                    socket.emit('SSocketDom.editors', {
                      data: renderedHtml,
                      innerHtml: {
                        animIn: 'fadeUp',
                        animOut: 'fadeDown'
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
    socket.on('SSocketDom.noAppSpecified', () => {
      // try to load a 'code-playground.config.js' file at the process root
      if (__fs.existsSync(process.cwd() + '/code-playground.config.js')) {
        // load the config file
        const codePlaygroundConfig = require(process.cwd() + '/code-playground.config.js');

        if (__fs.existsSync(process.cwd() + '/package.json')) {
          const packageJson = require(process.cwd() + '/package.json'); // process contributors avatars


          packageJson.contributors.forEach(contributor => {
            contributor.gravatar = __gravatarUrl(contributor.email);
          });
          socket.emit('SSocketDom.packageJson', {
            data: packageJson
          }); // rendering toplinks and send them to the interface

          handlerbarsEngine.render("src/views/topLinks.handlebars", {
            packageJson
          }).then(renderedHtml => {
            socket.emit('SSocketDom.topLinks', {
              data: renderedHtml
            });
          });
        } // render the page


        handlerbarsEngine.render("src/views/home.handlebars", {
          pwd: Buffer.from(process.cwd()).toString('base64'),
          ...codePlaygroundConfig
        }).then(renderedHtml => {
          socket.emit('SSocketDom.editors', {
            data: renderedHtml
          });
        });
      } else {
        handlerbarsEngine.render("src/views/error.handlebars", {
          error: 'No app specified... Please try again...'
        }).then(renderedHtml => {
          socket.emit('SSocketDom.content', {
            data: renderedHtml,
            innerHtml: {
              animIn: 'fadeUp',
              animOut: 'fadeDown'
            }
          });
        });
      }
    });
  }); // set the layout in the config if passed as query param

  app.use(require('./middleware/layout')); // layout rendering

  app.get(/.*/, function (req, res) {
    const arrUrl = req.url.split('/');
    const appId = arrUrl[1];

    if (__isBase64(appId) && Buffer.from(appId, 'base64').toString('ascii').match(/https?:\/\/(github\.com)\/.+/gs)) {
      req.session.appId = appId;
    } // render the page


    res.render('loading', {
      compileServer: JSON.stringify({
        port: config.compileServerPort || 4000
      })
    });
  });

  __log(`Code Playground : starting on port ${config.port}...`, 'info'); // start demo server


  server.listen(config.port, function () {
    __log('Code Playground : ✓ running on port ' + config.port + '!', 'info');

    __log(`Code Playground : access interface on http://localhost:${config.port}`, 'info');
  });
  process.on('exit', function () {
    if (request) request.session = null;
  });
};