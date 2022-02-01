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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-readme }}

## Promises with event capabilities

This `SPromise` class workds like a normal `Promise` but add the `SEventEmitter` capabilities like:

- `emit`: emitting events
- `on`: subscribe to events
- `pipe`: pipe events to another `SEventEmitter` instance
- And more... 

## Usage

Here's how to use our implementation:

```js
import __SPromise from '@coffeekraken/s-promise';

function myInternalProcess() {
    return new __SPromise(({resolve, reject, emit}) => {
        // emitting a log event
        emit('log', {
            value: 'Something cool'
        });
        resolve();
    });
}
function myStartingProcess() {
    return new __SPromise(async ({resolve, reject, emit, pipe}) => {
        // start internal process AND pipe his events higher
        const promise = pipe(myInternalProcess());
        // listen for logs. Can be any event name you want as well...
        promise.on('log', (data, metas) => {
            // do something with the logs...
        });
        // resolving the promise with our internal process one
        resolve(promise);
    });
}

const promise = myStartingProcess();
promise.on('log', () => {});
// etc...
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-promise.shared.SPromise)

#### Settings

{{> interface namespace='@coffeekraken.s-promise.shared.interface.SPromiseSettingsInterface' }}

{{/ layout-readme }}