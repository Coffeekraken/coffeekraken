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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Overview

Component in Coffeekraken is very important part of our vision, and this, event is as everything else, they can be used or not inside your project. Totally your decision.

## What are components?

We call `component` everything that takes place inside your HTML like a `button`, a form `input`, etc...

Inside the component category, we also include `web`components. These are new custom elements that you can use within your HTML like `s-date-picker`, `s-color-picker`, `s-side-panel`, etc...

## Components MUST follow some simple rules

All the components that we provide follows these simple rules:

1. A component **MUST** be as customizable as possible
2. A component **MUST** provide at least 2 `scopes`. (see bellow for more information)
3. A component **MUST** work out of the box without anything more to do
4. A component **MUST** follow your `theme` specifications if the `lnf` (look and feel) `scope` is applied

## Scopes

What are these `scopes`?

To be quick and as descriptive as possible, `scopes` are simply the whole style applied to a `button` (for example) splited into different parts.

Here's the base list of `scopes` that a component **MUST** use:

1. `bare`: This scope named `bare` represent all the structural CSS of the component. For a button, this will contain:
    - `font-size` property
    - `display` property
    - `padding` property(ies)
    - `cursor` property
    - etc...
2. `lnf`: This scope named `lnf` (look and feel) represent all the visual CSS of the component. This can be:
    - `color` property
    - `background` property
    - `border` property
    - `font-family` property
    - etc...

> With these scopes defined, you can choose if you want integrate a component with all his CSS, only the `bare` scope and apply your own visual style to it, or take only the `lnf` scope which it less meaningful alone...

{{/layout-doc }}
