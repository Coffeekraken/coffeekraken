# Coffeekraken pre-view <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/pre-view?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/pre-view?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/pre-view?style=flat-square)

Simple command line interface that let you preview your `blade` or `twig` views in your favourite browser

## Table of content

1. [Features](#readme-features)
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [CLI config](#readme-cli-config)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-features"></a>

## Features

1. Support `blade` and `twig` views
2. Automatically starts a PHP server
3. Hotkey to quickly change between views
4. Hotkey to switch between registered states (mobile, tablet, etc...)

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/pre-view --save
```

<a name="readme-get-started"></a>

## Get Started

First, create a file named `pre-view.config.js` at the root of your project. Here's a config sample

```js
module.exports = {
  folder: `${process.cwd()}/views`,
  watch: `${process.cwd()}/dist`,
  hostname: '127.0.0.1',
  open: true,
  hotkey_selector: 'command+enter',
  hotkey_states: 'ctrl+enter',
  js: 'dist/js/app.bundle.js',
  css: 'dist/css/style.css',
  states: '100%,768px,480px'
}
```

Then create a `views` folder also at the root of your project. You can then create the folder structure you want in this folder. The only rule that you have to follow is to name your views `[name].blade.php` or `[name].twig.php`.

The last installation process is to add a script in your `package.json` like so:

```json
{
  ...
  scripts: {
    "pre-view": "ck-pre-view [...config]"
  },
  ...
}
```

You can then launch your pre-view instance by typing: `npm run pre-view`

<a name="readme-cli-config"></a>

# CLI config

Here's the list of command line config that you can pass:

- `-c | --config`: Specify the config file path to load
- `-f | --folder`: Specify the folder to serve with the php server
- `-w | --watch`: Specify some folders to watch in order to refresh the browser automatically
- `-p | --port`: Specify the port to use for the php server
- `-h | --hostname`: Specify the hostname to use for the php server
- `-o | --open`: Open the browser at the server url
- `-b | --binary`: Specify the path the the php binary
- `-i | --ini`: Specify a path to a custom php.ini file
- `--hotkey_selector`: Specify a hotkey that will display the view select module
- `--hotkey_states`: Specify a hotkey that will switch between the preview states
- `--js`: Specify a javascript file path to load in the preview
- `--css`: Specify a css file path to load in the preview

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
