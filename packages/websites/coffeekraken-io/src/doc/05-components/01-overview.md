<!--
/**
 * @name            Overview
 * @namespace       doc.components
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Components           /doc/components/overview
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Overview

Component in Coffeekraken is very important part of our vision, and this, even is as everything else, they can be used or not inside your project. Totally your decision.

## What are components?

We call `component` everything that takes place inside your HTML like a `button`, a form `input`, etc...

Inside the component category, we also include `web`components. These are new custom elements that you can use within your HTML like `s-date-picker`, `s-color-picker`, `s-panel`, etc...

## Official components

Here's the list of currently official available components:

{{#each docmap.menu.slug}}
{{#ifMatch @key 'styleguide\/ui' }}

- [`{{replace @key '/styleguide/ui/' ''}}`]({{@key}})
  {{/ifMatch}}
  {{/each}}

And here's the list of our official `web`components:

{{#each docmap.menu.packages }}
{{#ifMatch @key '-component$' }}

- [`{{replace @key '@coffeekraken/' ''}}`](/{{@key}}/doc/readme)
  {{/ifMatch}}
  {{/each}}

## Components MUST follow some simple rules

All the components that we provide follows these simple rules:

1. A component **MUST** be as customizable as possible
2. A component **MUST** provide at least 2 `scopes`. (see bellow for more information)
3. A component **MUST** work out of the box without anything more to do
4. A component **MUST** follow your `theme` specifications if the `lnf` (look and feel) `scope` is applied

{{/layout-doc }}
