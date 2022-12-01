<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-frontend-server

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-frontend-server?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-frontend-server)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-frontend-server?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-frontend-server)
[![license](https://shields.io/npm/l/@coffeekraken/s-frontend-server?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Main Coffeekraken frontend server that powers the &quot;generic&quot; projects and handle things like folder based routing, views rendering, etc...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-frontend-server

```

<!-- body -->

<!--
/**
* @name            README
* @namespace       doc
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation           /doc/readme
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

## SFrontendServer

This package represent the development server used to serve things like php views (`blade`, `twig`, etc...) and provide simple `routing system` and template data providing like `docmap`, `packageJson`, and more...

## Usage

Here's how to use our implementation:

```js
import __SFrontendServer from '@coffeekraken/s-frontend-server';
const server = new __SFrontendServer();
await server.start({
  port: 8080,
  // etc...
});

```

### Technology

This server is using the AMAZING [Express](https://expressjs.com/) package to handle HTTP requests, register routes, etc...

### Modules

All the server is structured around `modules`. A module is simply a function that will take as parameter the `express` app instance and hook the Express server with new middlewares, routes, etc...


-   **404**: This module handle the 404 by rendering either your 404 page configured in the pages or the default 404 page
    
-   **publicDir**: This module allows you to serve files from the public directory
    
-   **upload**: This module allows you to upload files to the tmp/upload directory
    
-   **generic**: This module gives you access to the &quot;generic&quot; handler that renders dynamically views from your page config
    
-   **docmap**: This module gives you access to a &quot;docmap&quot; object in the views
    
-   **carpenter**: This module gives you access to a &quot;carpenter&quot; object in the views
    
-   **redirect**: This module allows you to make redirections depending on requested path
    
-   **config**: This module gives you access to a &quot;config&quot; and a &quot;configFiles&quot; object into the views
    
-   **frontspec**: This module gives you access to a &quot;frontspec&quot; object into the views
    
[More on modules](/doc/servers/modules)

## Handlers

Handlers are `controllers` for specific routes. This mean that when you call for example the route `/something/cool`, you must have an handler registered to take care of this request.


[More on handlers](/doc/servers/handlers)

## Middlewares

Middlewares are functions that will be executed between the incoming request and the response sending to client. For more information about middlewares, I let you check the [express.js middleware documentation](https://expressjs.com/en/guide/using-middleware.html).


-   **bench**: Track how many times take a request
    
-   **request**: Inject the &quot;request&quot; object for views
    
-   **env**: Inject an &quot;env&quot; object for the views
    
-   **packageJson**: Inject a &quot;packageJson&quot; object for the views
    
[More on middlewares](/doc/servers/middlewares)

## Routing

The routing of this server is pretty simple and stands on the `src/pages` folder structure.

Admit that we have this folder structure:

```txt

|
| src
|---| pages
|   |---| hello
|       |---| hello.ts
|---| views
|   |---| hello.twig
|

```

And that the `hello.ts` file contains:

```js
export default {
  views: ['hello'],
};

```

This will render the view stored under `src/views/hello.twig` when you reach the `/hello` url.

[More on routing](/doc/routing/overview)

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-frontend-server.node.SFrontendServer)

#### `server.start()` parameters

<span class="s-typo s-typo--code">
SFrontendServerStartParamsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
hostname  *             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">127.0.0.1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Server hostname</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
port             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">8080</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Server port</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
listen             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want the server to listen on specified hostname and port for requests or not</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
rootDir             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Server root directory</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
viewsDir             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/src/views</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Server views directory</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
pagesDir             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/src/pages</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Server pages directory</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
logLevel             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">info</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the log level you want for your server</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
prod             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify that we want the server to act "like" a production one with compression etc...</p>
</dt>
</dl>


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
