<!--
/**
 * @name            Main
 * @namespace       views.layout
 * @type            Markdown
 * @platform        blade
 * @platform        twig
 * @status          stable
 * @menu            Views / Layout           /views/layout/main
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Main layout

This `layout` view handle the base html structure with the `html`, `body` and `head` parts. It take advantage of the `frontspec.json` data to include things like metas, assets (js, css), opengraph metas, google analytics, etc...

## Features

-   Metas through `frontspec.metas`
-   Opengraph metas through `frontspec.metas.og`
-   Assets (css, js) through `frontspec.assets`
-   Google (analytics, tag manager) through `frontspec.google`

## Usage

#### Blade

```php
@extends('@sugar.layouts.main.main', [ 'frontspec' => [] ])
@section('body')
    <h2>Hello world</h2>
@endsection
```

#### Twig

```twig
{% extends "@coffeekraken/layouts/main.twig" %}
{% block body %}
    <h2>Hello world</h2>
{% endblock %}
```

## Specifications

{{> spec path='sugar.views.layouts.main' }}

{{/layout-doc }}
