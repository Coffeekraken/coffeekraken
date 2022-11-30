<!--
/**
 * @name            Layout
 * @namespace       specs.views.bare.layout
 * @type            Markdown
 * @platform        blade
 * @platform        twig
 * @status          stable
 * @menu            Specs / Views           /specs/sugar.views.bare.layout
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Layout

This view allows you to generate quickly and efficiently fully responsive layout (section).

## Features

-   Generate fully responsive layouts
-   Easy and nice layout string notation like `1 1 2 _ 1 1 3`
-   Full support for medias specified in your `frontspec.json` file

## Usage

#### Blade

```php
@include('sugar.bare.layout.layout', [
    'id' => 'my-cool-layout',
    'layout' => [
        'desktop' => '1 1 2 _ 1 1 3'
        'mobile' => '1 _ 2 _ 3'
    ],
    'content' => '
        <div>Cell #1</div>
        <div>Cell #2</div>
        <div>Cell #3</div>
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
{% include 'sugar.bare.layout.layout' with {
    content: '<h2>Hello world</h2>',
    layout: {
        desktop: '1 1 2 _ 1 1 3'
        mobile: '1 _ 2 _ 3'
    },
    content: '
        <div>Cell #1</div>
        <div>Cell #2</div>
        <div>Cell #3</div>
    ',
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

{{> spec path='sugar.views.bare.layout' }}

{% endblock %}
