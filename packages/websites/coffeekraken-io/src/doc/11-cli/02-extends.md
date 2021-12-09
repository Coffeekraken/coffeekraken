<!--
/**
 * @name            Extend the CLI
 * @namespace       doc.cli
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CLI           /doc/cli/extends
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Extends the CLI

As the rest of our ecosystem, the CLI is modular and you can extends it as you want.

The CLI features are declared inside a `sugar.json` file at the root of your package. When I say package it can be a private project as a published one on NPM for example.

The idea behind that is to let you extends the CLI with features you need or features you think can be useful for others.

## How it works?

When you launch the `sugar` CLI, it will search for all the `sugar.json` files at all the packages root, then by reading each of them, build his list of available commands.

Your project structure can be something like:

-   `src`
-   `package.json`
-   `sugar.json`

## Simple example

Consider implementing a wonderful command that will simply display `hello world` on the screen.

#### First

Create the `sugar.jcon` file at your project root and fill it like so:

```json
{
    "cli": [
        {
            "stack": "mySoCool",
            "description": "My so cool stack with some so cool commands",
            "defaultAction": "prettyCommand",
            "actions": {
                "prettyCommand": {
                    "scope": "global",
                    "description": "Allows to display 'hello world' on screen",
                    "process": "./src/node/prettyCommand.cli.ts"
                }
            }
        }
    ]
}
```

This will tell the CLI that a `mySoCool` stack exists with a command(s) `prettyCommand`.

#### Second

Then you need to create the `src/node/prettyCommand.cli.ts` file with this content:

```js
export default function prettyCommand(stringArgs = '') {
    return new Promise((resolve, reject) => {
        console.log('hello world');
        resolve();
    });
}
```

This example will work fine and display `hello world` on the screen.

However, using basic `Promise` force us to make use of the `console.log` command directly and this does not allows us to take advantage of our `@coffeekraken/s-stdio` that works by "listening" to `log` events and display your log as best as possible depending on the stdio you choose. Stop talking and let see our example rewritten:

```js
import __SPromise from '@coffeekraken/s-promise';

export default function prettyCommand(stringArgs = '') {
    return new __SPromise(({ resolve, reject, emit }) => {
        emit('log', {
            value: 'hello world',
        });
        resolve();
    });
}
```

This make use of the `SPromise` class that is an extension of the `Promise` one and works exactly the same with some additional feature.

One of these features is the `emit` function that you can use to dispatch an event. Here the `log` one. This event will be catched by the CLI and transferred to the `SStdio` instance to display your log as best as possible.

For more information about this `SStdio` and `SPromise` classes, I let you check their documentation directly in their own packages.

> This **event** driven log principle gives you then the opportunity to filter the logs you want to display, and a lot more...

#### Using your command

To make use of your command, make sure to launch it either through your project where the `sugar.json` that declare it stands, or in a project where your package has been installed.

Then, simply launch:

```shell
sugar mySoCool.prettyCommand
```

As your `prettyCommand` has been declared as the "defaultAction", you can also launch it like so:

```shell
sugar mySoCool
```

## Going further

Some additional features can be applied like a documentation when the users enters `sugar mySoCool.prettyCommand -h`.

For that, simply add the `interface` property inside your `sugar.json` file like so:

```json
{
    "cli": [
        {
            "stack": "mySoCool",
            "description": "My so cool stack with some so cool commands",
            "defaultAction": "prettyCommand",
            "actions": {
                "prettyCommand": {
                    "scope": "global",
                    "description": "Allows to display 'hello world' on screen",
                    "process": "./src/node/prettyCommand.cli.ts",
                    "interface": "./src/node/prettyCommandInterface.ts"
                }
            }
        }
    ]
}
```

Then create the `src/node/prettyCommandInterface.ts` with this as content:

```js
import __SInterface from '@coffeekraken/s-interface';

export default class SActivateFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            something: {
                description:
                    'This is a nice and cool argument for our freaking awesome command!',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
```

This make use of the `@coffeekraken/s-interface` package that let you define interfaces to describe things like a parameter object, etc...

Note that this `SInterface` class can be used as well for other things and works very well with our `SProcess` class from the `@coffeekraken/s-process` package.

> I let you check the `@coffeekraken/s-interface` documentation inside his own package.

Now when you launch your command with `sugar mySoCool.prettyCommand --help` you will have a nicely displayed documentation.

{{/layout-doc }}
