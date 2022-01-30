### Config file

The server will instanciate itself using the `.sugar/frontendServer.config.ts` configuration file. This file declare all the `middlewares`, `handlers`, `routes` and `modules` to use.

Here's a bare configuration file:

```js
export default function() {
    return {
        handlers: {},
        middlewares: {},
        modules: {},
        routes: {}
    }
}
```


##### Register a module

To register a new module, you will need to create a file called `frontendServer.config.ts` inside the `.sugar` folder located in your package root directory.

The file will look like so:

```js
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function() {
    return {
        modules: {
            myCoolModule: {
                path: `${__dirname()}/../src/node/myCoolModule.ts`,
                settings: {}
            }
        }
    }
}
```