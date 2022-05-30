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

## SFile

This package expose a simple `SFile` class that allows you to represent a file on the filesystem.

## Features

-   Access to file metas like:
    -   `name`: The file name
    -   `nameWithoutExt`: The file name without the extension
    -   `path`: The absolute file path
    -   `relPath`: The relative path from the `cwd`
    -   `dirPath`: The absolute directory path
    -   `extension`: The file extension without the `.`
    -   `exists`: true if the file exists on the filesystem, false if not
    -   `content`: The file content
    -   `stats`: The file `fs.statSync` stats object
-   Proceed some actions on the file like:
    -   `watch(callback)`: Watch the file
    -   `toObject()`: Convert the SFile instance into a simple object
    -   `read()`: Read async
    -   `readSync()`: Read sync
    -   `write(data)`: Write async
    -   `writeSync(data)`: Write sync
    -   `save()`: Save the current content async
    -   `saveSync()`: Save the current content sync
    -   `unlink()`: Delete the file async
    -   `unlinkSync()`: Delete the file sync
-   Listen for events:
    -   `on('update', (file) => {})`: Listen for file update
-   And more...

## Usage

Here's a simple example how to use the SFile class:

```js
import __SFile from '@coffeekraken/s-file';
const file = new __SFile('/ma/cool/file.json');
file.name; // file.json
file.path; // /my/cool/file.json
file.extension; // json
file.unlinkSync(); // delete the file
```

## Settings

{{> interface namespace='@coffeekraken.s-file.node.interface.SFileSettingsInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-file.node.SFile)

{{/ layout-readme }}
