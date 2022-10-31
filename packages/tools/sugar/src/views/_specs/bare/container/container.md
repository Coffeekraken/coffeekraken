<!--
/**
 * @name            Container
 * @namespace       specs.views.bare.container
 * @type            Markdown
 * @platform        blade
 * @platform        twig
 * @status          stable
 * @menu            Specs / Views           /specs/sugar.views.bare.container
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Container

The goal of this view is to wrap your sections and either centers it or make it full width depending on the selected container `type`.

## Features

-   Multiple `type` available like `wide`, `full` or `tight`
-   Support of responsive `paddings`
-   Support of responsive `margins`
-   Full support for `layout.container` configs specified in your `frontspec.json` file

## Usage

#### Blade

```php
@include('sugar.bare.container.container', [
    'type' => [
        'default' => '',
        'wide' => 'full'
    ],
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
{% include 'sugar.bare.container.container' with {
    type: {
        default: '',
        wide: 'full'
    },
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

{{> spec path='sugar.views.bare.container' }}

{{/layout-doc }}
