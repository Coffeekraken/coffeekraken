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

<!-- image -->

<!-- header -->
##### @coffeekraken/coffeekraken-io



# Overview

Component in Coffeekraken is very important part of our vision, and this, even is as everything else, they can be used or not inside your project. Totally your decision.

## What are components?

We call `component` everything that takes place inside your HTML like a `button`, a form `input`, etc...

Inside the component category, we also include `web`components. These are new custom elements that you can use within your HTML like `s-date-picker`, `s-color-picker`, `s-panel`, etc...

## Official components

Here's the list of currently official available components:


-   [`avatar`](/styleguide/ui/avatar)

-   [`backdrop`](/styleguide/ui/backdrop)

-   [`badges`](/styleguide/ui/badges)

-   [`blockquote`](/styleguide/ui/blockquote)

-   [`button`](/styleguide/ui/button)

-   [`dropdown`](/styleguide/ui/dropdown)

-   [`fs-tree`](/styleguide/ui/fs-tree)

-   [`lists`](/styleguide/ui/lists)

-   [`loaders`](/styleguide/ui/loaders)

-   [`tabs`](/styleguide/ui/tabs)

-   [`table`](/styleguide/ui/table)

-   [`tooltip`](/styleguide/ui/tooltip)

-   [`group`](/styleguide/ui/group)

-   [`scrollbar`](/styleguide/ui/scrollbar)

-   [`icons`](/styleguide/ui/icons)

And here's the list of our official `web`components:


-   [`s-clipboard-copy-component`](/package/@coffeekraken/s-clipboard-copy-component/doc/readme)

-   [`s-code-example-component`](/package/@coffeekraken/s-code-example-component/doc/readme)

-   [`s-color-picker-component`](/package/@coffeekraken/s-color-picker-component/doc/readme)

-   [`s-datetime-picker-component`](/package/@coffeekraken/s-datetime-picker-component/doc/readme)

-   [`s-filtrable-input-component`](/package/@coffeekraken/s-filtrable-input-component/doc/readme)

-   [`s-panel-component`](/package/@coffeekraken/s-panel-component/doc/readme)

-   [`s-range-component`](/package/@coffeekraken/s-range-component/doc/readme)

-   [`s-rating-component`](/package/@coffeekraken/s-rating-component/doc/readme)

-   [`s-scroll-component`](/package/@coffeekraken/s-scroll-component/doc/readme)

-   [`s-slider-component`](/package/@coffeekraken/s-slider-component/doc/readme)

-   [`s-theme-switcher-component`](/package/@coffeekraken/s-theme-switcher-component/doc/readme)

## Components MUST follow some simple rules

All the components that we provide follows these simple rules:

1. A component **MUST** be as customizable as possible
2. A component **MUST** provide at least 2 `scopes`. (see bellow for more information)
3. A component **MUST** work out of the box without anything more to do
4. A component **MUST** follow your `theme` specifications if the `lnf` (look and feel) `scope` is applied

