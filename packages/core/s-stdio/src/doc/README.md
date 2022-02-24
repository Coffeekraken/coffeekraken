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

{{#> layout-readme }}

## Easy and powerful IO interface

This package allows you to display processes/webpages logs with ease.
Here's some of the features available:

- `SBasicStdio`: Nice IO interface for terminal
- `SConsoleStdio`: Nive IO interface for browser (coming soon...)
- **Event** based log system
- **Filtrable output** depending on log `type`
- **Extensible** IO system for things like websockets, etc...
- And more...

## Usage

Here's how to use our implementation:

```js
import __SStdio from '@coffeekraken/s-stdio';
import spawn from '@coffeekraken/sugar/node/process/spawn';
const proc = spawn('ls -la');
__SStdio.new('default', proc);
```

## How it works

The `SStdio` class will listen for some events `log` and `ask`. Once one of these events is triggered, the IO will either display a log, or the asked question using different implementations depending on the `SStdio` instanciated type.

The event are listened using the [SEventEmitter](/@coffeekraken/s-event-emitter/doc/readme) class.

Here's an example of emitting a log event that will be handled by the `SStdio` instance:

```js
import __SPromise from '@coffeekraken/s-promise';
import __SLog from '@coffeekraken/s-log';

export default function myProcess() {
    return new __SPromise(({resolve, reject, emit}) => {
        // do something...
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: 'Hello world from my cool process'
        });
        // do something...
        resolve();
    });
}
```

> Note that the `SPromise` class extends the `SEventEmitter` one.

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-stdio.shared.SStdio)

#### Settings

{{> interface namespace='@coffeekraken.s-stdio.shared.interface.SStdioSettingsInterface' }}

{{/ layout-readme }}