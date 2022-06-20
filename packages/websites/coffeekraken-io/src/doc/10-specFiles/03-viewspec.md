<!--
/**
 * @name            Viewspec
 * @namespace       doc.specFiles
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Spec files           /doc/specfiles/viewspec
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# `viewspec.json`

> Spec version **1.0.0-alpha.0**

## Why?

His goal is to describe a particular view like `hello.blade.php`.
By describing the data that this view depends on, you can use that and build your backend automatically. Pretty usefull for medium/large projects.

## Overview

The `viewspec.json` files has to live in at the same place of the view he's describe. Each viewspec describe a specific view and has to respect this structure:

```js
{
    "id": "my-cool-view",
    "name": "My cool view",
    "description": "This is my cool view that handle the display of cool things",
    "engine": "blade",
    "props": {
        "title": {
            "type": "String",
            "required": true
        },
        "author": {
            "type": "Object",
            "props": {
                "name": {
                    "type": "String",
                    "label": "Author name",
                    "required": true
                },
                "email": {
                    "type": "String",
                    "label": "Author email",
                    "required": true
                }
            }
        },
        "images": {
            "type": "Image[]",
            "label": "Cool images",
            "required": true
        }
    }
}
```

## Data types

Here's the main data types that we think cover a lot of situations. Note that this is more to take as example that final types. You can specify your own types as well depending on your needs:

-   `String`: Simple string data
-   `Date`: Simple [ISO](https://en.wikipedia.org/wiki/ISO_8601) date string
-   `DateTime`: Simple [ISO](https://en.wikipedia.org/wiki/ISO_8601) datetime string
-   `Time`: Simple [ISO](https://en.wikipedia.org/wiki/ISO_8601) time string
-   `Number`: Simple number
-   `Integer`: Simple integer number
-   `Image`: Simple image data
    -   `src`: The source of the image
    -   `alt`: The alternative text
    -   `title`: The image title
-   `Object`: An object described by his own `props`

## Repeatable types `array`

To define a prop as **repeatable**, simply suffix his `type` with `[]`.

Here's a simple example

```js
{
    "props": {
        "images": {
            "type": "Image[]",
            "label": "Images"
        }
    }
}
```

## Resulting data

If we take the overview example above, the resulting data that has to be injected into the view at his render phase could be something like this:

```php
return [
    'title' => 'Hello world',
    'author' => [
        'name' => 'Olivier Bossel',
        'email' => 'something@gmail.com',
    ],
    'images' => [
        [
            'src' => 'https://picsum.photos/200/300',
            'title' => 'Hello',
            'alt' => 'world',
        ],
        [
            'src' => 'https://picsum.photos/200/300',
            'title' => 'Hello',
            'alt' => 'world',
        ],
    ],
];
```

{{/layout-doc }}
