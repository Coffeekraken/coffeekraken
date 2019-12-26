const __express = require('express');
const __path = require('path');
const __fs = require('fs');
const __sass = require('sass');
const __webpack = require('webpack');
const __cors = require('cors');
const __bodyParser = require('body-parser');
const __extend = require('lodash/extend');
const __shortid = require('shortid');
const __exec = require('child_process').exec;
const __HtmlEntities = require('html-entities').AllHtmlEntities;
const __stylus = require('stylus');
const __Cryptr = require('cryptr');

const __isBase64 = require('@coffeekraken/sugar/js/is/base64');
const __decodeBase64 = require('@coffeekraken/sugar/node/string/decodeBase64');

module.exports = function(config) {

	// creating the app
	const app = __express();

	// cryptr instance
	let cryptr;
	if (config.secret) {
		cryptr = new __Cryptr(config.secret);
	}

	// parser body
	app.use(__bodyParser.json());
	app.use(__bodyParser.urlencoded({ extended: true }));

	// cors
	app.use(__cors({
		origin: '*'
	}));

	// attach config to request
	app.use((req, res, next) => {
		req.config = Object.assign({}, config);
		next();
	});

	// pwd
	app.use((req, res, next) => {

		// pwd
		let pwd = null;
		if (req.query.pwd || req.body.options.pwd) {
			pwd = req.query.pwd || req.body.options.pwd;
		} else {
			pwd = process.env.PWD;
		}
		if (__isBase64(pwd)) pwd = __decodeBase64(pwd);

		// set pwd in config
		req.config.pwd = pwd;

		// next
		next();
	});

	// Stylus
	app.post(/\/compile\/(stylus|styl)$/, function (req, res) {

		// check code
		if ( ! req.body.data) {
			res.status(500).json({
				error : 'Missing "data" argument'
			});
			return;
		}

		// htmlentities
		const htmlEntities = new __HtmlEntities();

		// options
		const options = __extend({
			compress: true
		}, req.body.options || {});

		// compile using sass
		__stylus(htmlEntities.decode(req.body.data), options)
		.include(req.config.pwd)
		.render((error, css) => {
			if ( ! error) {
				res.status(200).json({
					language : 'css',
					data : css
				});
			} else {
				res.status(500).json({
					error : error
				});
			}
		});
	});

	// SASS
	app.post(/\/compile\/(sass|scss)$/, function (req, res) {

		// check code
		if ( ! req.body.data) {
			res.status(500).json({
				error : 'Missing "data" argument'
			});
			return;
		}

		// htmlentities
		const htmlEntities = new __HtmlEntities();

		// options
		const options = __extend({
			data : htmlEntities.decode(req.body.data),
			outputStyle: 'compressed'
		}, req.body.options || {});
		// include paths
		options.includePaths = [].concat(options.includePaths || [], req.config.pwd, req.config.pwd + '/node_modules');

		// compile using sass
    __sass.render(options, (error, result) => {
      if ( ! error) {
        res.status(200).json({
          language: 'css',
          data: result.css.toString()
        });
      } else {
        res.status(500).json({
          error: error
        });
      }
    });
	});

	// JS
	app.post(/\/compile\/(js|javascript|coffee|coffeescript|ts|typescript)$/, function (req, res) {

		// check code
		if ( ! req.body.data) {
			res.status(500).json({
				error : 'Missing "data" argument'
			});
			return;
		}

		// file extension
		let ext = '.js';
		if (req.path.match(/\/(ts|typescript)$/)) ext = '.ts';
		if (req.path.match(/\/(coffee|coffeescript)$/)) ext = '.coffee';

		// generate file hash
		const fileName = __shortid.generate() + ext;
		const filePath = req.config.pwd + '/' + fileName;
		const dirPath = __path.dirname(filePath);

		// htmlentities
		const htmlEntities = new __HtmlEntities();

		// write file content to use
		__fs.writeFileSync(filePath, htmlEntities.decode(req.body.data));

		// options
		const options = __extend({
			mode: 'development',
			context : req.config.pwd,
			entry : filePath,
			target: 'web',
			output : {
				path : dirPath,
				filename : fileName
			},
			module : {
				rules : [{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader'
				}, {
					test: /\.coffee$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'coffee-loader'
				}, {
					test: /\.tsx?$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'ts-loader'
				}]
			}
		}, req.body.options || {});

		delete options.pwd;

		// compile using sass
		__webpack(options, (error, result) => {
			if ( ! error) {
				// read file content
				const content = __fs.readFileSync(filePath, 'utf8');

				// delete file
				__exec('rm -rf ' + filePath);

				// send back result
				res.status(200).json({
					language : 'js',
					data : content
				});
			} else {
				// delete file
				__exec('rm -rf ' + filePath);

				// send back error
				res.status(500).json({
					error : error
				});
			}
		});
	});

	// start demo server
	app.listen(config.port, function () {
		console.log('Compile Server : ✓ running on port ' + config.port + '!');
	});
}
