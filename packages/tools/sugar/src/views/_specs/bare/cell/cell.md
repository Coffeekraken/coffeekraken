<!--
/**
 * @name            Cell
 * @namespace       views.bare.cell
 * @type            Markdown
 * @platform        blade
 * @platform        twig
 * @status          stable
 * @menu            Views / Bare           /views/bare/cell
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Cell

Simple cell that can be used inside a layout, etc...

## Features

-   Support of responsive `paddings`
-   Support of responsive `margins`

## Usage

#### Blade

```php
@include('@sugar.bare.cell.cell', [
    'content' => '
        <h2>Hello world</h2>
    ',
    'margin' => [
        'default' => [
            'bottom' => '50'
        ],
        'mobile' => [
            'bottom' => '20'
        ]
    ]
])
```

#### Twig

```twig
{% include 'sugar.bare.cell.cell' with {
    content: '<h2>Hello world</h2>',
    margin: {
        default: {
            bottom: '50'
        },
        mobile: {
            bottom: '20'
        }
    }
} %}
```

## Specifications

{{> spec path='sugar.views.bare.cell' }}

{{/layout-doc }}
