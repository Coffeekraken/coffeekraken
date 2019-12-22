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
const __aes = require('@coffeekraken/sugar/js/crypt/aes');
const __queryString = require('querystring');

// console.log(__aes.encrypt('Coffeekraken/coffeekraken/style/button-style'));
// console.log(__aes.decrypt('U2FsdGVkX1+VeRFKXOzQW18DGDsh3FBuR38rr4m0DTUZ2c1//QRMz/fb4XAYT0RLwhC6wQo2o6gmqaIt8omBOQ=='));

module.exports = function(config) {

	// creating the app
	const app = __express();
	let request = null;
  handlerbarsEngine = __expressHandlebars.create({
    layoutsDir : __dirname + '/../../../src/views/layouts',
    partialsDir : __dirname + '/../../../src/views',
		defaultLayout : 'main'
  });

	// handlebars
	app.engine('handlebars', __expressHandlebars({
		layoutsDir : __dirname + '/../../../src/views/layouts',
		defaultLayout : 'main'
	}));
	app.set('views',__dirname + '/../../../src/views');
	app.set('view engine', 'handlebars');

	// static files
	app.use('/dist', __express.static(__dirname + '/../../../dist'));

	// cookie session
	app.set('trust proxy', 1)
	app.use(__cookieSession({
		name : 'code-playground-'+__md5(config.title),
		secret : 'coffeekraken-code-playground'
	}));

	// cryptr instance
 	let cryptr;
	if (config.secret) {
		cryptr = new __Cryptr(config.secret);
	}

	// expose the request to the global scope
	app.use((req, res, next) => {
		request = req;
		next();
	});

	// protect
	app.use((req, res, next) => {
		if (/^\/dist\//.test(req.url)) return;
		if (req.url.match('favicon.ico')) return;
		if (req.url.match('.js.map')) return;
		next();
	});

	// attach config to request
	app.use((req, res, next) => {
		req.config = __clone(config);
		next();
	});

  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {

    socket.on('SSocketDom.noAppSpecified', () => {
      handlerbarsEngine.render("src/views/noAppSpecified.handlebars").then((renderedHtml) => {
          socket.emit('SSocketDom.body', {
            data: renderedHtml
          });
      });
    });

   console.log('a user is connected')
 });

	app.use((req, res, next) => {
		if (!req.query.github) {
			next()
			return
		}

    // decrypt the github url
    const url = __aes.decrypt(req.query.github.replace(' ','+'));
    const repo = url.split('/').slice(0, 2).join('/');
    const path = url.split('/').slice(-2).join('/');


    const options = {
      url: `https://api.github.com/repos/${repo}/contents/${path}`,
      headers: {
        'User-Agent': 'coffeekraken-code-playground'
      }
    };
    // __request(options, (error, response, body) => {
    //   const files = JSON.parse(body);
    //   const packageJson = files.find(file => file.name === 'package.json');
    //   const codePlaygroundConfig = files.find(file => file.name === 'code-playground.config.js');
    //
    //   console.log(packageJson);
    //   console.log(codePlaygroundConfig);
    //
    //   // download the package.json content and the code-playground.config.js content
    //   __request(packageJson.download_url, (error, response, body) => {
    //     console.log(body);
    //   });
    //   __request(codePlaygroundConfig.download_url, (error, response, body) => {
    //
    //   });
    //
    // });

		// __https.get({
		// 	hostname: 'api.github.com',
		// 	path: req.query.github,
		// 	headers: {
		// 		'User-Agent': 'Coffeekraken-code-playground'
		// 	}
		// }, (resp) => {
		// 	let data = '';
    //
		//   // A chunk of data has been recieved.
		//   resp.on('data', (chunk) => {
		//     data += chunk;
		//   });
    //
		//   // The whole response has been received. Print out the result.
		//   resp.on('end', () => {
    //
		// 		// loop on each files to find "package.json" and "code-playground.config.js"
		// 		let packageJson, codePlaygroundConfig;
		// 		JSON.parse(data).forEach((resource) => {
		// 			if (resource.name === 'package.json') {
		// 				console.log('PACKAGE', resource.download_url);
		// 				__https.get(resource.download_url, (res) => {
		// 					let d = '';
		// 					res.on('data', (chunk) => {
		// 						d += chunk;
		// 				  });
		// 					res.on('end', () => {
		// 						console.log('re', d);
		// 					});
		// 				});
		// 			}
		// 		});
    //
		//   });
    //
		// 	// next
		// 	next();
		// });

    next();

	});

	// pwd
  app.use(require('./middleware/pwd'));

	// static files
	app.use(require('./middleware/staticFiles'));

	// apps
	app.use(require('./middleware/apps'));

	// read config if an app is passed
	// and merge this config with the one that we have already
	app.use(require('./middleware/appConfig'));

	// if is a demo to display, we merge the config.editors with the
	// config.demos[demo].editors
	app.use(require('./middleware/demo'));

	// read the package.json file of the pwd
	// and set it in the request object to pass it
	// to the next handler
	app.use(require('./middleware/packageJson'));

  // set the layout in the config if passed as query param
	app.use(require('./middleware/layout'));

  app.get(/.*/, function(req, res) {

    // render the page
		res.render('loading', {
			title : req.config.title || 'Code Playground',
      pwd : (cryptr) ? cryptr.encrypt(req.config.pwd) : req.config.pwd,
      packageJson : req.packageJson,
      compileServerSettings : JSON.stringify(req.config.compileServer),
      gtm : req.config.gtm
      // logo : req.config.logo,
			// config : req.config,
			// apps : req.apps,
			// demos: req.config.demos || null,
			// editors : {
			// 	html : req.config.editors.html,
			// 	css : req.config.editors.css,
			// 	js : req.config.editors.js
			// },
			// helpers: {
			// 	isCurrentUrl: function (url, options) {
			// 		if (req.url === `/app/${url}`) {
			// 			return options.fn(this);
			// 		}
			// 		return options.inverse(this);
			// 	 }
			// }
		});

  });

	// // global route
	// app.get(/.*/, function (req, res) {
	// 	// editors
	// 	if (req.config.editors.html) {
	// 		req.config.editors.html.language = req.config.editors.html.language || 'html';
	// 		req.config.editors.html.title = req.config.editors.html.title || req.config.editors.html.language;
	// 		if (req.config.editors.html.file && __fs.existsSync(req.config.pwd + '/' + req.config.editors.html.file)) {
	// 			req.config.editors.html.data = __fs.readFileSync(req.config.pwd + '/' + req.config.editors.html.file, 'utf8');
	// 		}
	// 		req.config.editors.html.updateOn = req.config.editors.html.updateOn || (req.config.editors.html.language !== 'html') ? 'run' : null;
	// 	}
	// 	if (req.config.editors.css) {
	// 		req.config.editors.css.language = req.config.editors.css.language || 'css';
	// 		req.config.editors.css.title = req.config.editors.css.title || req.config.editors.css.language;
	// 		if (req.config.editors.css.file && __fs.existsSync(req.config.pwd + '/' + req.config.editors.css.file)) {
	// 			req.config.editors.css.data = __fs.readFileSync(req.config.pwd + '/' + req.config.editors.css.file, 'utf8');
	// 		}
	// 		req.config.editors.css.updateOn = req.config.editors.css.updateOn || (req.config.editors.css.language !== 'css') ? 'run' : null;
	// 	}
	// 	if (req.config.editors.js) {
	// 		req.config.editors.js.language = req.config.editors.js.language || 'js';
	// 		req.config.editors.js.title = req.config.editors.js.title || req.config.editors.js.language;
	// 		if (req.config.editors.js.file && __fs.existsSync(req.config.pwd + '/' + req.config.editors.js.file)) {
	// 			req.config.editors.js.data = __fs.readFileSync(req.config.pwd + '/' + req.config.editors.js.file, 'utf8');
	// 		}
	// 		req.config.editors.js.updateOn = req.config.editors.js.updateOn || 'run';
	// 	}
  //
	// 	// delete the secret from the compileServerSettings to not expose sensible infos
	// 	delete req.config.compileServer.secret;
  //
	// 	// render the page
	// 	res.render('home', {
	// 		title : req.config.title || 'Code Playground',
	// 		logo : req.config.logo,
	// 		config : req.config,
	// 		apps : req.apps,
	// 		pwd : (cryptr) ? cryptr.encrypt(req.config.pwd) : req.config.pwd,
	// 		packageJson : req.packageJson,
	// 		compileServerSettings : JSON.stringify(req.config.compileServer),
	// 		demos: req.config.demos || null,
	// 		editors : {
	// 			html : req.config.editors.html,
	// 			css : req.config.editors.css,
	// 			js : req.config.editors.js
	// 		},
	// 		gtm : req.config.gtm,
	// 		helpers: {
	// 			isCurrentUrl: function (url, options) {
	// 				if (req.url === `/app/${url}`) {
	// 					return options.fn(this);
	// 				}
	// 				return options.inverse(this);
	// 			 }
	// 		}
	// 	});
	// });

	console.log(`Code Playground : ...starting on port ${config.port}...`);

	// start demo server
	server.listen(config.port, function () {
		console.log('Code Playground : ✓ running on port ' + config.port + '!');
		console.log(`Code Playground : access interface on http://localhost:${config.port}`);
	});

	process.on('exit', function() {
		if (request) request.session = null;
	});
}
