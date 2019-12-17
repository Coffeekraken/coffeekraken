# Coffeekraken Starter Kit <img src=".resources/coffeekraken-logo.jpg" height="25px" />

Base HTML files and folder structure with complete build process (server, js, scss, image compression, etc...) built in

## Get started

To start using the starter kit, here's the command line starting point:

#### Download the starter kit by clicking [HERE](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/Coffeekraken/coffeekraken/tree/master/layout/starter-kit)

#### Make sure you have PHP installed on your device

```
php -v
```

If you have not PHP installed, follow [these instructions](https://www.php.net/manual/en/install.php) to install it.

#### Install the the dependencies

```
npm install
```

#### Start the server, build processes, etc...

```
npm start
```

## Features

Here's the list of features that are built-in the starter kit:

- [NPM](https://www.npmjs.com/) : Package manager
- [Babel](https://babeljs.io/) : Javascript compiler
- [Webpack](https://www.npmjs.com/package/webpack) : Build and compress JS files
  - [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) : Visualize size of webpack output files with an interactive zoomable treemap
- [Sass](https://www.npmjs.com/package/sass) : Process and build SCSS files into a style.css one
- [PostCSS](https://github.com/postcss/postcss-cli) : Transforming styles with JS plugins
  - [postcss-preset-env](https://github.com/csstools/postcss-preset-env) : Convert modern CSS into something browsers understand
- [Prettier](https://prettier.io/) : Format the code source files
  - [Pretty-quick](https://www.npmjs.com/package/pretty-quick) : Runs Prettier on your changed files
- [Browserslist](https://github.com/browserslist/browserslist) : Share target browsers between different front-end tools, like Autoprefixer, Stylelint and babel-preset-env
- [Editorconfig](https://editorconfig.org/) : Helps developers maintain consistent coding styles between different editors
- [ESLint](https://eslint.org/) : Find and fix problems in your JavaScript code
  - [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) : This package provides Airbnb's .eslintrc as an extensible shared config
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) : Turns off all rules that are unnecessary or might conflict with Prettier
- [Stylelint](https://www.npmjs.com/package/stylelint) : A mighty, modern linter that helps you avoid errors and enforce conventions in your styles
  - [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard?activeTab=dependents) : The standard shareable config for stylelint
- [Coffeekraken-pre-view](https://www.npmjs.com/package/@coffeekraken/pre-view) : Quickly start working on your views by using this simple CLI that will create for you a PHP server with the support for `blade` and `twig` render engine
- [Coffeekraken-imagemin](https://www.npmjs.com/package/@coffeekraken/imagemin) : Compress images
- [Coffeekraken-scripts-stack](https://www.npmjs.com/package/@coffeekraken/scripts-stack) : Nice terminal interface to handle npm/yarn scripts execution as well as watch and run automatically the wanted ones
- [Coffeekraken-gridle](https://www.npmjs.com/package/@coffeekraken/gridle) : Gridle is a simple but powerful and convenient grid that make use of the CSS grid model
- [Browsersync](https://www.browsersync.io/#install) : Time-saving synchronised browser testing
- [Cssuseragent](http://cssuseragent.org/) : Add some browsers specific classes to the HTML tag
- [Fastclick](https://github.com/ftlabs/fastclick) : Polyfill to remove click delays on browsers with touch UIs

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
